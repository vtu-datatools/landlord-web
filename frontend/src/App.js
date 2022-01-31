import React, { useState } from "react";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import "./styles.scss";

export default function App() {
  const [map, setMap] = useState(null);

  return (
    <div className="App">
      {map && <Sidebar map={map} />}
      p<Map setMap={setMap} />
    </div>
  );
}
