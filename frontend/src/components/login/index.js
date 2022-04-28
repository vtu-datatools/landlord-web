import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Formik } from "formik";
import { Header, Button } from "semantic-ui-react";
import { Form, SubmitButton, Input } from "formik-semantic-ui-react";

import { loginUser } from "../../redux/actions/auth";
import "./styles.css";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(4, "Username must be at least 4 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const LoginPage = ({ loginUser }) => {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
  };
  const onSubmit = async (values) => {
    await loginUser(values.username, values.password);
    navigate("/");
  };

  return (
    <div className="signup-page">
      <Header as="h2" textAlign="center">
        Login
      </Header>

      <Formik
        id="login-up-form"
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form size="large">
            <Input
              id="input-username"
              errorPrompt
              name="username"
              label="Username or Email"
              placeholder="Username or email"
            />
            <Input
              id="input-password"
              errorPrompt
              name="password"
              type="password"
              label="Password"
              placeholder="Password"
              autoComplete="off"
            />

            <SubmitButton primary fluid loading={isSubmitting}>
              Submit
            </SubmitButton>
          </Form>
        )}
      </Formik>
      <Button id="back-button" onClick={() => navigate(-1)}>
        Back
      </Button>
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
