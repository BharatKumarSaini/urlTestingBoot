import React from "react";
import { GoogleLogin } from "react-google-login";

const responseGoogle = (response) => {
  console.log(response);
};

const Test = () => (
  <GoogleLogin
    clientId="143296463873-llufv9tej17dka20f3ui4ka4o2l3q051.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={"single_host_origin"}
  />
);

export default Test;
