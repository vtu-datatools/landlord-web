import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { Header, Image, FormGroup, Button } from "semantic-ui-react";
import {
  Form,
  SubmitButton,
  ResetButton,
  Input,
} from "formik-semantic-ui-react";

import { loginUser } from "../../redux/actions/auth";
import { signUp } from "../api/authenticationApi";

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(4, "Username must be at least 4 characters")
    .max(20, "Username must not exceed 20 characters"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
  confirm_password: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
});

const SignUpPage = ({ loginUser }) => {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirm_password: "",
  };

  const onSubmit = async (values) => {
    console.log("signing up...");
    await signUp(
      values.username,
      values.email,
      values.password,
      values.first_name,
      values.last_name
    );
    console.log("signed up up...");
    loginUser(values.username, values.password);
    navigate("/");
  };
  return (
    <div className="signup-page">
      <Header as="h2" textAlign="center">
        <Image src={process.env.PUBLIC_URL + "/VTU_logo.jpg"} /> Sign Up
      </Header>
      <Formik
        id="sign-up-form"
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form size="large">
            <Input
              id="input-username"
              errorPrompt
              name="username"
              label="Username"
              placeholder="Username"
            />
            <Input
              id="input-email"
              errorPrompt
              name="email"
              label="Email"
              placeholder="Email"
            />
            <Input
              id="input-first-name"
              errorPrompt
              name="first_name"
              label="First Name"
              placeholder="First Name"
            />
            <Input
              id="input-last-name"
              errorPrompt
              name="last_name"
              label="Last Name"
              placeholder="Last Name"
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
            <Input
              id="input-confirm-password"
              errorPrompt
              name="confirm_password"
              type="password"
              label="Confirm Password"
              autoComplete="off"
            />

            <FormGroup unstackable>
              <SubmitButton primary fluid loading={isSubmitting} width={8}>
                Submit
              </SubmitButton>
              <ResetButton color="green" fluid width={8}>
                Reset
              </ResetButton>
            </FormGroup>
          </Form>
        )}
      </Formik>
      <Button onClick={() => navigate(-1)}>Back</Button>
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
