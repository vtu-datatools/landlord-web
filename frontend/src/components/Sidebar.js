import React, { useState, useRef, useEffect } from "react";
import { FiHome, FiChevronLeft, FiCompass, FiSettings } from "react-icons/fi";
import { Sidebar, Tab } from "./sidetabs";

const SidebarComponent = ({ map, address }) => {
  const isInitialMount = useRef(true);
  const [openTab, setOpenTab] = useState("home");

  const onClose = () => {
    setOpenTab(false);
  };

  const onOpen = (id) => {
    setOpenTab(id);
  };
  if (address == null) {
    address = {
      streenumber: "",
      street: "",
      businessoperator: 0,
      totalunits: 0,
      totaloutstanding: 0,
      detailurl: "",
    };
  }

  useEffect(() => {
    // Set sidebar tab to show address info on marker click (change of address)
    // Used this: https://stackoverflow.com/questions/55075604/react-hooks-useeffect-only-on-update
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setOpenTab("props");
    }
  }, [address]);
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
          <h3>Welcome to Vancouver Landlords</h3>
        </Tab>
        <Tab id="props" header="Props" icon={<FiCompass />}>
          <h3>
            {address.streetnumber} {address.street}
          </h3>
          <h4>Landlord: {address.businessoperator}</h4>
          <p>
            Total Outstanding Property Violations: {address.totaloutstanding}
          </p>
          <p>Total Apartment Units: {address.totalunits}</p>
          <p>
            <a
              href={address.detailurl}
              target="_blank"
              rel="noopener noreferrer"
            >
              More Details
            </a>
          </p>
          <p>
            <button
              className="checkoutpropsbutton"
              onClick={() => setOpenTab("props")}
            >
              More properties of same landlord
            </button>
          </p>
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
