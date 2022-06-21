import React from "react";
import { useNavigate } from "react-router-dom";

import { Image } from "semantic-ui-react";
import "./styles.css";

const Logo = () => {
  const navigate = useNavigate();
  const home = () => {
    navigate(`/`);
  };

  return (
    <div className="logoContainer">
      <Image
        src={process.env.PUBLIC_URL + "/VTU_logo_white.png"}
        className="logo"
        onClick={home}
      />
    </div>
  );
};

export default Logo;
