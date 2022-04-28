import React, { useState } from "react";

import Map from "./Map";
import Sidebar from "./Sidebar";

export default function MapPage() {
  const [map, setMap] = useState(null);
  const [address, setAddress] = useState();

  function handleClickMarker(address) {
    setAddress(address);
  }

  return (
    <div className="MapPage">
      {map && <Sidebar map={map} address={address} />}
      <Map
        setMap={setMap}
        address={address}
        onClickMarker={handleClickMarker}
      />
    </div>
  );
}
