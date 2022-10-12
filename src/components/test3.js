import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect, useState } from "react";

const Testy = () => {
  const [token, setToken] = useState(null);
  const responseGoogle = (response) => {
    console.log(response);
    setToken(response.credential);
  };
  useEffect(() => {
    console.log(token);
  }, [token]);
  return (
    <GoogleOAuthProvider clientId="143296463873-llufv9tej17dka20f3ui4ka4o2l3q051.apps.googleusercontent.com">
      ;
      <GoogleLogin onSuccess={responseGoogle} onError={responseGoogle} />;
    </GoogleOAuthProvider>
  );
};

export default Testy;
