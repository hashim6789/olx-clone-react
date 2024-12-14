// src/components/GoogleLoginButton.tsx
import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../contexts/authContext";
import axios from "axios";

const GoogleLoginButton: React.FC = () => {
  const { login } = useAuth();

  const handleSuccess = async (response: any) => {
    try {
      // Fetch user profile after successful login
      const { credential } = response;

      const { data } = await axios.get(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${credential}`, // ID Token URL
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      const serverResponse = await axios.post(
        "http://localhost:3000/auth/google",
        {
          token: credential,
        }
      );

      console.log("User Data: ", serverResponse.data.data); // Inspect user data
      localStorage.setItem("token", serverResponse.data.data.token);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const errorMessage = (error: any) => {
    console.log("Login Failed:", error);
  };

  return <GoogleLogin onSuccess={handleSuccess} />;
};

export default GoogleLoginButton;
