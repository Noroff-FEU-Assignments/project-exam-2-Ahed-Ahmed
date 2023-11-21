import Cookies from "js-cookie";
import React from "react";

const useGetProfileSearch = () => {
  const baseurl = process.env.REACT_APP_API_URL;
  const currentUserString = Cookies.get("userData") || null;
  const currentUser = currentUserString ? JSON.parse(currentUserString) : null;
  const token = currentUser?.accessToken || null;

  const [searchResults, setSearchResults] = React.useState(null);
  const [username, setUsername] = React.useState("");
  const [showComponent, setShowComponent] = React.useState(false);
  const [error, setError] = React.useState(null);

  const searchProfiles = async (username) => {
    try {
      const response = await fetch(`${baseurl}profiles/${username}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setSearchResults(result);
        setShowComponent(true);
        setUsername("");
      } else {
        throw new Error(`Error: ${response.statusText}`);
      }
    } catch (errors) {
      setError(errors.message);
      setShowComponent(true);
      setUsername("");
      setSearchResults(null);
    }
  };

  return {
    searchResults,
    username,
    showComponent,
    setShowComponent,
    setUsername,
    searchProfiles,
    error,
  };
};

export default useGetProfileSearch;
