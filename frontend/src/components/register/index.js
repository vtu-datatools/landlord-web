import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { Header, Image, FormGroup, Button } from "semantic-ui-react";
import {
  Form,
  SubmitButton,
  ResetButton,
  Input,
} from "formik-semantic-ui-react";

import { loginUser } from "../../redux/actions/auth";
import { registerApi } from "../../api/user";
import SignupSchema from "./schema";

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues = {
    username: "",
    email: "",
    name: "",
    password: "",
    confirm_password: "",
  };

  const onSubmit = async (values) => {
    await registerApi(
      values.username,
      values.email,
      values.password,
      values.name
    );
    dispatch(loginUser(values.username, values.password));
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
        validateOnChange={false}
        validateOnBlur={false}
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
              id="input-name"
              errorPrompt
              name="name"
              label="Name"
              placeholder="Name"
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
      <Button id="back-button" onClick={() => navigate(-1)}>
        Back
      </Button>
    </div>
  );
};

export default SignUpPage;
