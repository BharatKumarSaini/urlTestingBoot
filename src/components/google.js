import React from "react";

import { GoogleAPI, GoogleLogin, GoogleLogout } from "react-google-oauth";

const Google = () => {
  const handler = (e) => {
    console.log(e);
  };
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <GoogleAPI
        clientId="143296463873-llufv9tej17dka20f3ui4ka4o2l3q051.apps.googleusercontent.com"
        onUpdateSigninStatus={handler}
      >
        <div>
          <GoogleLogin />
          <GoogleLogout />
        </div>
      </GoogleAPI>
    </div>
  );
};

export default Google;
