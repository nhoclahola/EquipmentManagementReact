import { Button, TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik, FormikHelpers, FormikValues } from "formik"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { loginThunk } from "../redux/auth/auth.action";

const initialValues = { username: "", password: "" };
const validationSchema = {
  username: Yup.string().required("Cần phải nhập username"),
  password: Yup.string().min(3, "Mật khẩu ít nhất 3 ký tự").required("Cần phải nhập mật khẩu")
};

const Login = () => {
  const loginError = useAppSelector((state: RootState) => state.auth.error);
  const [formValue, setFormValue] = useState([]);
  const dispatch = useAppDispatch();
  const handleSubmit = (values: FormikValues) => {
    console.log("handle", values);
    dispatch(loginThunk({data: values}))
  };
  useEffect(() => {
    console.log(loginError)
  }, [loginError])
  return (
    <div>
      <Formik 
        validationSchema={Yup.object(validationSchema)} 
        initialValues={initialValues} 
        onSubmit={handleSubmit}>
        <Form className="space-y-5">
          <div className="space-y-5">
            <div>
              <Field as={TextField} name="username" placeholder="Username" type="text" fullWidth></Field>
              <ErrorMessage name="username" component={"div"} className="text-red-600"></ErrorMessage>
            </div>
            <div>
              <Field as={TextField} name="password" placeholder="Password" type="password" fullWidth></Field>
              <ErrorMessage name="password" component={"div"} className="text-red-600"></ErrorMessage>
            </div>
          </div>
          <Button 
            sx={{padding: ".8rem 0rem", backgroundColor: "red", "&:hover": { backgroundColor: "darkblue" }}} 
            fullWidth 
            variant="contained"
            color="primary"
            type="submit">Đăng nhập</Button>
        </Form>
      </Formik>
      {loginError && <div className="text-red-600 text-center">{loginError?.response?.data}</div>}
      {/* <div className="flex gap-5 mt-5 items-center">
        <h2 className="">If you don't have account?</h2>
        <Link to={"/register"} replace>
          <h2 className="text-blue-500 hover:text-blue-700">Register</h2>
        </Link>
      </div> */}
    </div>
  )
}

export default Login