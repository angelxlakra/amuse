import React from "react";
const Login = () => {
  if (!localStorage.getItem("id")) {
    // alert("logged out state was in");
    window.location = "http://localhost:8888/auth/login";
  } else {
    // alert("Logged in state was in");
    window.history.back();
  }
};

export default Login;
