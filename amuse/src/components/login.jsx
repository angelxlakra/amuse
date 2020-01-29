import React from "react";
const Login = () => {
  if (!sessionStorage.getItem("id")) {
    // alert("logged out state was in");
    window.location = "http://192.168.157.122:8888/auth/login";
  } else {
    // alert("Logged in state was in");
    window.history.back();
  }
};

export default Login;
