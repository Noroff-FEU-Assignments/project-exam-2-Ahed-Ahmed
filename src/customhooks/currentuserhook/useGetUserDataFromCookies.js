// useUserDataFromCookies.js
import React from "react";
import Cookies from "js-cookie";

export const useGetUserDataFromCookies = () => {
  const [currentUser, SetCurrentUser] = React.useState(null);

  React.useEffect(() => {
    // Retrieve user data from cookies
    const userDataString = Cookies.get("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      SetCurrentUser(userData);
    }
  }, []);

  return {
    currentUser,
  };
};
