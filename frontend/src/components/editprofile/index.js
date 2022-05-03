import React from "react";
// import Dropzone from "react-dropzone";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";
import { Header, Image, FormGroup } from "semantic-ui-react";
import {
  Form,
  SubmitButton,
  ResetButton,
  Input,
} from "formik-semantic-ui-react";
import { editProfileAction } from "../../redux/actions/auth";
// import { imageUploadApi } from "../../api/image";
import "./styles.css";

const EditSchema = Yup.object().shape({
  bio: Yup.string().notRequired("Tell us about yourself!"),
  name: Yup.string().required("Name is required"),
  current_password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
  new_password: Yup.string()
    .notRequired("Enter a new password")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
  status: Yup.string().notRequired("Status"),
});

const EditProfile = () => {
  //   const dispatch = useDispatch();

  const { username, name, email, avatar } = useSelector((state) => ({
    username: state.auth.username,
    name: state.auth.name,
    email: state.auth.email,
    avatar: state.auth.avatar,
    isLoading: state.auth.isLoading,
  }));

  const initialValues = {
    username: { username },
    email: { email },
    name: { name },
    current_password: "",
    new_password: "",
  };
  console.log(username, name, email, avatar);
  const onSubmit = (values) => {
    editProfileAction(values);
  };

  //   const onImageDrop = (files) => {
  //     setState({
  //       avatarFile: files[0],
  //     });
  //   };

  //   handleSubmit = () => {
  //     const { currentPassword, avatarFile } = this.state;

  //     if (currentPassword !== "") {
  //       if (!avatarFile) {
  //         // no new avatar
  //         editProfile();
  //       } else {
  //         setState({
  //           avatarUploading: true,
  //         });

  //         imageUploadApi(avatarFile)
  //           .then((response) => {
  //             setState({
  //               avatar: response.data.secure_url,
  //               avatarUploading: false,
  //             });
  //             editProfile();
  //           })
  //           .catch((error) => {
  //             console.log(error);
  //             setState({
  //               avatarError: "Image Upload Error",
  //               avatarFile: null,
  //               avatarUploading: false,
  //             });
  //           });
  //       }
  //     }
  //   };

  //   const avatarURL = avatarFile ? avatarFile.preview : avatar;

  return (
    <div className="signup-page">
      <Header as="h2" textAlign="center">
        <Image src={process.env.PUBLIC_URL + "/VTU_logo.jpg"} /> Sign Up
      </Header>
      <Formik
        id="registration-form"
        initialValues={initialValues}
        validationSchema={EditSchema}
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
    </div>
  );
};

export default EditProfile;
