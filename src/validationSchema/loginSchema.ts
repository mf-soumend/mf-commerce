import * as Yup from "yup";

export const initialLoginData = {
  username: "",
  password: "",
};

export const loginSchema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .min(2, "Username minimum length should be 2")
    .required("Username is required"),
  password: Yup.string().trim().required("Password is required"),
});
