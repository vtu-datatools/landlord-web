import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";

import { loginUser } from "../../redux/actions/auth";

const LoginPage = ({ loginUser }) => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };
  const login = async (event) => {
    event.preventDefault();
    const { username, password } = state;
    await loginUser(username, password);
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
            <Image src={process.env.PUBLIC_URL + "/VTU_logo.jpg"} /> Log-in to
            your account
          </Header>
          <Form size="large" onSubmit={login}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                name="username"
                placeholder="E-mail address"
                defaultValue={state.email}
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
              <Message
                error
                header="Action Forbidden"
                content="You can only sign up for an account once with a given e-mail address."
              />
              <Button primary type="submit" fluid size="large">
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us?
            <Link to="/sign-up"> Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
};
LoginPage.propTypes = {
  loginUser: PropTypes.func.isRequired,
};
const mapDispatchToProps = {
  loginUser,
};
export default connect(null, mapDispatchToProps)(LoginPage);
