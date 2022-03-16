import React from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <div>
      <h1>Sign Up page</h1>
      <button onClick={handleClick}>sign up</button>
    </div>
  );
};
export default SignUpPage;
