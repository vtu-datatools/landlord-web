import React, { useState } from "react";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import "./styles.scss";

export default function App() {
  const [map, setMap] = useState(null);
  const [address, setAddress] = useState();

  function handleClickMarker(address) {
    setAddress(address);
  }
  return (
    <div className="App">
      {map && <Sidebar map={map} address={address} />}
      <Map
        setMap={setMap}
        address={address}
        onClickMarker={handleClickMarker}
      />
    </div>
  );
}
