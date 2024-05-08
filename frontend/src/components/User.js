import React, { useEffect, useState } from "react";
import axiosInstance from "../Axios";

const UserDetailsComponent = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch user details from the backend
    const fetchUserDetails = async () => {
      try {
        // Make a GET request to the user details endpoint
        const response = await axiosInstance.get("user/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        // Set the user details state with the response data
        setUserDetails(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    // Call the fetchUserDetails function when the component mounts
    fetchUserDetails();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading user details...</p>
      ) : (
        <div>
          {userDetails && userDetails.user_name ? (
            <div>
              <p>Username: {userDetails.user_name}</p>
              <p>Email: {userDetails.email}</p>
              {/* Display other user details as needed */}
            </div>
          ) : (
            <p>Anonymous User</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDetailsComponent;
