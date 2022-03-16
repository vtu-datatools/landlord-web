import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";

import { loginUser } from "../../redux/actions/auth";
import { signUp } from "../api/authenticationApi";

const SignUpPage = ({ loginUser }) => {
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const createUser = async (event) => {
    event.preventDefault();
    const { username, email, password, first_name, last_name } = state;
    await signUp(username, email, password, first_name, last_name);
    console.log("signed up");
    loginUser(username, password);
    console.log("logged in?");
    navigate("/");
  };

  return (
    <div>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" textAlign="center">
            <Image src={process.env.PUBLIC_URL + "/VTU_logo.jpg"} /> Sign Up
          </Header>
          <Form size="large" onSubmit={createUser}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                name="username"
                placeholder="Username"
                defaultValue={state.username}
                onChange={handleChange}
              />
              <Form.Input
                fluid
                icon="envelope"
                iconPosition="left"
                name="email"
                placeholder="E-mail address"
                defaultValue={state.email}
                onChange={handleChange}
              />
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                name="first_name"
                placeholder="First Name"
                defaultValue={state.first_name}
                onChange={handleChange}
              />
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                name="last_name"
                placeholder="Last Name"
                defaultValue={state.last_name}
                onChange={handleChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                name="password"
                placeholder="Password"
                type="password"
                defaultValue={state.password}
                onChange={handleChange}
              />
              <Button primary type="submit" fluid size="large">
                Submit
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
};
SignUpPage.propTypes = {
  loginUser: PropTypes.func.isRequired,
};
const mapDispatchToProps = {
  loginUser,
};
export default connect(null, mapDispatchToProps)(SignUpPage);
