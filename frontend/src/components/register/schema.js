import * as Yup from "yup";
import { usernameAvailable, emailAvailable } from "../../api/user";

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(4, "Username must be at least 4 characters")
    .max(20, "Username must not exceed 20 characters")
    .test(
      "username-check",
      "Username already exists",
      async function validateUser(value) {
        try {
          const userAvailable = await usernameAvailable(value);
          return userAvailable.data.message;
        } catch (error) {
          return true;
        }
      }
    ),
  email: Yup.string()
    .required("Email is required")
    .email("Email is invalid")
    .test(
      "email-check",
      "Email already exists",
      async function validateEmail(value) {
        try {
          const email = await emailAvailable(value);
          return email.data.message;
        } catch (error) {
          return true;
        }
      }
    ),
  name: Yup.string().required("Name is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
  confirm_password: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
});

export default SignupSchema;
