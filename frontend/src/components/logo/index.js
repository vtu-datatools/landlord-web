import React from "react";
import { Image } from "semantic-ui-react";
import "./styles.css";

const Logo = () => {
  return (
    <div className="logoContainer">
      <Image src={process.env.PUBLIC_URL + "/VTU_logo.jpg"} className="logo" />
    </div>
  );
};

export default Logo;
