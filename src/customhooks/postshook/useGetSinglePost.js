import Cookies from "js-cookie";
import React from "react";

export const useGetPostByID = () => {
  const baseurl = process.env.REACT_APP_API_URL;
  const currentUserString = Cookies.get("userData") || null;
  const currentUser = currentUserString ? JSON.parse(currentUserString) : null;
  const token = currentUser?.accessToken || null;

  const [singledata, setSingleData] = React.useState({});
  const [isloading, setloading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [showComponent, setShowComponent] = React.useState(false);

  const getData = async (id) => {
    try {
      setloading(true);
      const response = await fetch(`${baseurl}posts/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setSingleData(result);
        setShowComponent(true);
        setloading(false);
      } else {
        // Handle non-successful response
        throw new Error(`Error: ${response.statusText}`);
      }
    } catch (errors) {
      setError(errors.message);
      setShowComponent(false);

      setSingleData(null);
    }
  };

  return {
    singledata,
    showComponent,
    setShowComponent,
    getData,
    isloading,
    error,
  };
};
