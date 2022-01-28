import React, { useMemo } from 'react'
import { MapContainer, TileLayer, ScaleControl, LayersControl, FeatureGroup, Marker } from 'react-leaflet'

import "leaflet/dist/leaflet.css";

const center = [49.25, -123.13]
const zoom = 13

const Map = props => {

   const map = useMemo( () => {
      return  (
         <MapContainer 
            doubleClickZoom={false}
            id="mapId"
            zoom={zoom}
            center={center}
            whenCreated={props.setMap}>
   
            <TileLayer
               url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
               attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />

            <ScaleControl />

            <LayersControl>
               <LayersControl.Overlay name="Marker Overlay">
                  <FeatureGroup>
                     <Marker position={{lat: 57.8817, lng: -154.4253}} />
                  </FeatureGroup>
               </LayersControl.Overlay>
            </LayersControl>
   
         </MapContainer>
      )
   }, [])

   return  map

}

export default Map