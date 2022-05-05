import React, { useEffect } from "react";
// import Dropzone from "react-dropzone";
import { useSelector, useDispatch } from "react-redux";
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
import { fetchUserProfile } from "../../redux/actions/userprofile";
import StatusMessage from "../../components/statusmessage";
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
  const dispatch = useDispatch();

  const { username, token, isLoading, profile, error } = useSelector(
    (state) => ({
      username: state.auth.username,
      token: state.auth.token,
      isLoading: state.userProfile.isLoading,
      profile: state.userProfile.profile,
      error: state.userProfile.error,
    })
  );

  useEffect(() => {
    dispatch(fetchUserProfile(username));
  }, [dispatch]);

  if (error || !profile || isLoading) {
    return (
      <StatusMessage
        error={error || !profile}
        errorClassName="userProfile-error"
        errorMessage={error}
        loading={isLoading}
        loadingMessage={`We are fetching the user profile for you`}
        type="default"
      />
    );
  }

  const initialValues = {
    username: username,
    bio: profile.bio,
    name: profile.name,
    current_password: "",
    new_password: "",
  };
  const onSubmit = (values) => {
    console.log(values);
    dispatch(editProfileAction(values.username, token, values));
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
    <div className="edit-page">
      <Header as="h2" textAlign="center">
        <Image src={process.env.PUBLIC_URL + "/VTU_logo.jpg"} /> Edit Profile
      </Header>
      <Formik
        id="edit-form"
        initialValues={initialValues}
        enableReinitialize={true}
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
              id="input-bio"
              errorPrompt
              name="bio"
              label="Bio"
              placeholder="Bio"
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
              name="current_password"
              type="password"
              label="Current Password"
              placeholder="Current Password"
              autoComplete="off"
            />
            <Input
              id="input-new-password"
              errorPrompt
              name="cnew_password"
              type="password"
              label="New Password"
              placeholder="New Password"
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
