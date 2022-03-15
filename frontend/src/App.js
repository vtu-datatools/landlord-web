import React, { useState } from "react";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import { Button } from "semantic-ui-react";
import "./css/App.css";

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
      <Button primary id="userbutton" size="small" zIndex={2000}>
        Sign In
      </Button>
    </div>
  );
}
