import React, { useMemo, useState } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
  GeoJSON,
  ZoomControl,
} from "react-leaflet";
import axios from "axios";
import hash from "object-hash";

// This part is required to configure the default marker icons
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

// Vancouver
const center = [49.25, -123.13];
const zoom = 13;

function Markers(props) {
  // GeoJSON data of markers
  const [data, setData] = useState();
  // Address state to lift up to Sidebar
  const [address, setAddress] = useState();
  const map = useMap();

  const handleClickMarker = (e) => {
    setAddress(e.sourceTarget.feature.properties);
    props.onClickMarker(e.sourceTarget.feature.properties);
  };

  // TODO: Refactor to avoid repeating code
  useMapEvents({
    moveend: () => {
      const markers_url = `/api/landlords/issues/?in_bbox=${map
        .getBounds()
        .toBBoxString()}`;
      axios.get(markers_url).then((resp) => {
        setData(resp.data);
      });
    },
    zoomend: () => {
      const markers_url = `/api/landlords/issues/?in_bbox=${map
        .getBounds()
        .toBBoxString()}`;
      axios.get(markers_url).then((resp) => {
        setData(resp.data);
      });
    },
    layeradd: () => {
      const markers_url = `/api/landlords/issues/?in_bbox=${map
        .getBounds()
        .toBBoxString()}`;
      axios.get(markers_url).then((resp) => {
        setData(resp.data);
      });
    },
  });

  if (data) {
    return (
      <GeoJSON
        // hash is required here to force react-leaflet to re-render the geojson
        key={hash(data)}
        data={data}
        eventHandlers={{ click: handleClickMarker }}
        address={address}
      />
    );
  } else {
    return null;
  }
}

function Map(props) {
  const [address, setAddress] = useState();
  // Lift up address from Markers
  function handleClickMarker(address) {
    setAddress(address);
    props.onClickMarker(address);
  }

  const map = useMemo(() => {
    return (
      <MapContainer
        doubleClickZoom={false}
        id="mapId"
        zoom={zoom}
        zoomControl={false}
        center={center}
        // Used to lift map to Sidebar
        whenCreated={props.setMap}
      >
        <Markers address={address} onClickMarker={handleClickMarker} />
        <TileLayer
          url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <ZoomControl position="bottomright" />
      </MapContainer>
    );
  }, []);

  return map;
}

export default Map;
