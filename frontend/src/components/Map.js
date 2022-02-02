import React, { useMemo, useState } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
  GeoJSON,
} from "react-leaflet";
import axios from "axios";
import hash from "object-hash";

import "leaflet/dist/leaflet.css";

// This part is required to configure the default marker icons
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const center = [49.25, -123.13];
const zoom = 13;

function Markers() {
  const [data, setData] = useState();
  const map = useMap();

  useMapEvents({
    moveend: () => {
      const markers_url = `/api/landlord/?in_bbox=${map
        .getBounds()
        .toBBoxString()}`;
      axios.get(markers_url).then((resp) => {
        setData(resp.data);
      });
    },
    zoomend: () => {
      const markers_url = `/api/landlord/?in_bbox=${map
        .getBounds()
        .toBBoxString()}`;
      axios.get(markers_url).then((resp) => {
        setData(resp.data);
      });
    },
    layeradd: () => {
      const markers_url = `/api/landlord/?in_bbox=${map
        .getBounds()
        .toBBoxString()}`;
      axios.get(markers_url).then((resp) => {
        setData(resp.data);
      });
    },
  });

  if (data) {
    // hash is required here to force react-leaflet to re-render the geojson
    return <GeoJSON key={hash(data)} data={data} />;
  } else {
    return null;
  }
}

const Map = (props) => {
  const map = useMemo(() => {
    return (
      <MapContainer
        doubleClickZoom={false}
        id="mapId"
        zoom={zoom}
        center={center}
        whenCreated={props.setMap}
      >
        <Markers />
        <TileLayer
          url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    );
  }, []);

  return map;
};

export default Map;
