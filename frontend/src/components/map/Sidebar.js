import React, { useState, useEffect } from "react";
import { FiMenu, FiX, FiMap } from "react-icons/fi";
import { Sidebar, Tab } from "./sidetabs";

import ProfileButtons from "./ProfileButtons";

const SidebarComponent = ({ map, address }) => {
  const [openTab, setOpenTab] = useState(false);

  const onClose = () => {
    setOpenTab(false);
  };

  const onOpen = (id) => {
    setOpenTab(id);
  };
  if (address == null) {
    address = {
      streetnumber: "",
      street: "",
      businessoperator: 0,
      totalunits: 0,
      totaloutstanding: 0,
      detailurl: "",
    };
  }

  useEffect(() => {
    if (address.streetnumber !== "") {
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
        closeIcon={<FiX />}
        onClose={onClose}
        onOpen={onOpen}
        panMapOnChange
        rehomeControls
      >
        <Tab id="home" header="Home" icon={<FiMenu />} active>
          <h3>Vancouver Landlord Database</h3>
          <ProfileButtons />
          <p>Work in Progress by VTU Data Tools</p>
        </Tab>
        <Tab id="props" header="Address" icon={<FiMap />}>
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
        {/* <Tab
          id="settings"
          header="Settings"
          icon={<FiSettings />}
          anchor="bottom"
        >
          Profile info will go here
        </Tab> */}
      </Sidebar>
    </section>
  );
};

export default SidebarComponent;
