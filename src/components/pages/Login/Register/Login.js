import React from "react";
import { useState } from "react";
import { TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxIcon from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { Button, Form } from "react-bootstrap";
import { Divider } from "@material-ui/core";
import api from "../../../../AxiosCall";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import { useAppContext } from "../../../../providers/AppProvider";
import { Height } from "@material-ui/icons";

toast.configure();

const Login = () => {
  const { dispatch } = useAppContext();
  let history = useHistory();
  const email = useInput("");
  const password = useInput("");
  const onLoginHandel = async (event) => {
    event.preventDefault();
    let userData = {
      username: email.value,
      password: password.value,
    };
    await api
      .post("/authenticate/login", userData)
      .then((res) => {
        email.onClear();
        password.onClear();
        history.push("/");
        toast("You are logged in now " + res.data.name);
        dispatch({ type: "login", payload: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div
                  className="col-lg-6 d-none d-lg-block bg-login-image"
                  style={{ height: "600px" }}
                ></div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Management Studio</h1>
                      <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                    </div>
                    <Form onSubmit={onLoginHandel} className="user">
                      <div className="form-group">
                        <input
                          type="email"
                          {...email}
                          fullWidth
                          className="form-control form-control-user"
                          id="email"
                          placeholder="Email"
                        ></input>
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          {...password}
                          fullWidth
                          className="form-control form-control-user"
                          id="Pasword"
                          placeholder="Password"
                        ></input>
                      </div>
                      <button
                        type="submit"
                        href="index.html"
                        className="btn btn-primary btn-user btn-block"
                      >
                        Login
                      </button>
                    </Form>
                    <div className="text-center">
                      <a className="small" href="forgot-password.html">
                        Forgot Password?
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
function useInput(init) {
  const [value, setValue] = useState(init);
  const onHandleChange = (e) => {
    setValue(e.target.value);
  };

  const onHandleClear = () => {
    setValue("");
  };
  return {
    value,
    onChange: onHandleChange,
    onClear: onHandleClear,
  };
}
export default Login;
