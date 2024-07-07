// OAuthLogin.js
import React from "react";
import axiosInstance from "../../Axios";

const GoogleLogin = () => {
  const handleOAuthLogin = async () => {
    try {
      const provider = "google"; // Replace with your OAuth provider
      const { data } = await axiosInstance.post("/oauth/login/", {
        provider: provider,
        access_token: "YOUR_ACCESS_TOKEN_HERE", // Replace with actual access token from OAuth provider
      });
      console.log("OAuth login successful:", data);
      // Handle successful login (e.g., store tokens, redirect)
    } catch (error) {
      console.error("OAuth login error:", error);
      // Handle errors
    }
  };

  return <button onClick={handleOAuthLogin}>Login with Google</button>;
};

export default GoogleLogin;
