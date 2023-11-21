// import React from "react";
// import { useState, useEffect } from "react";

// import Cookies from "js-cookie";
// import toast from "react-hot-toast";

// export const useGetMobileUserProfile = () => {
//   const baseurl = process.env.REACT_APP_API_URL;
//   const currentUserString = Cookies.get("userData") || null;
//   const currentUser = currentUserString ? JSON.parse(currentUserString) : null;
//   const token = currentUser?.accessToken || null;
//   const [profileMobileData, setMobileProfileData] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [username, setUsername] = React.useState("");
//   const getUserProfile = async (username) => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       if (!username) {
//         setMobileProfileData(null);
//         return;
//       }

//       const response = await fetch(`${baseurl}profiles/${username}`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const result = await response.json();
//         setMobileProfileData(result);
//       } else {
//         throw new Error(`Error: ${response.statusText}`);
//       }
//     } catch (error) {
//       setMobileProfileData(null);
//       setError("No profile data available");
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   const clearProfileData = () => {
//     setMobileProfileData(null);
//     setUsername(null);
//   };
//   return {
//     profileMobileData,
//     username,
//     setUsername,
//     isLoading,
//     error,
//     getUserProfile,
//     clearProfileData,
//     setMobileProfileData,
//   };
// };
