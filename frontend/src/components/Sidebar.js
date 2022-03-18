import React, { useState } from "react";
import { FiHome, FiChevronLeft, FiCompass } from "react-icons/fi";
import { Sidebar, Tab } from "./sidetabs";

const SidebarComponent = ({ map, address }) => {
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
          <h3>Vancouver Landlord Database</h3>
          This is a work in progress by the data-tools working group of the{" "}
          <a href="https://www.vancouvertenantsunion.ca/">
            Vancouver Tenants Union
          </a>
          .
        </Tab>
        <Tab id="props" header="Address" icon={<FiCompass />}>
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
