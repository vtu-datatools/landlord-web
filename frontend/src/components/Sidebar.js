import React, { useState } from "react";
import { FiHome, FiChevronLeft, FiCompass, FiSettings } from "react-icons/fi";
import { Sidebar, Tab } from "./sidetabs";

const SidebarComponent = ({ map }) => {
  const [openTab, setOpenTab] = useState("home");

  const onClose = () => {
    setOpenTab(false);
  };

  const onOpen = (id) => {
    setOpenTab(id);
  };

  return (
    <section className="Sidebar">
      <Sidebar
        map={map}
        position="left"
        collapsed={!openTab}
        selected={openTab}
        closeIcon={<FiChevronLeft />}
        onClose={onClose}
        onOpen={onOpen}
        panMapOnChange
        rehomeControls
      >
        <Tab id="home" header="Home" icon={<FiHome />} active>
          <p>
            This sidebar is adapted from{" "}
            <a
              href="https://github.com/eferhatg/react-leaflet-sidetabs"
              target="_blank"
              rel="noopener noreferrer"
            >
              react-leaflet-sidetabs
            </a>{" "}
            to be compatible with react-leaflet version 3.
          </p>
          <p>
            If you want to be able to influence the map from within the sidebar
            tabs, you must{" "}
            <a
              href="https://react-leaflet-v3.now.sh/docs/example-external-state"
              target="_blank"
              rel="noopener noreferrer"
            >
              externalize the map context
            </a>
            . This is also required if you want the map to adjust its center
            when the sidebar opens as closes, as it does in this example.
          </p>
          <p>
            <button
              className="checkoutpropsbutton"
              onClick={() => setOpenTab("props")}
            >
              Check out the second tab&nbsp;
            </button>
            to see the <code>props</code> for this component.
          </p>
        </Tab>
        <Tab id="props" header="Props" icon={<FiCompass />}>
          <h3>Address</h3>
          <h4>Landlord Name</h4>
          <p>More information on building here.</p>

          <h3>2nd Address</h3>
          <h4>Landlord Name</h4>
          <p>More information on building here.</p>
        </Tab>
        <Tab
          id="settings"
          header="Settings"
          icon={<FiSettings />}
          anchor="bottom"
        >
          <p>
            The button for this tab can be anchored to the bottom by using the{" "}
          </p>
        </Tab>
      </Sidebar>
    </section>
  );
};

export default SidebarComponent;
