import Cookies from "js-cookie";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetFollowedProfilesQuery } from "../../../features/profile/profileApiSlice";

export const useGetProfileFollowed = () => {
  const currentUserString = Cookies.get("userData") || null;
  const currentUser = currentUserString ? JSON.parse(currentUserString) : null;
  const username = currentUser?.name || null;

  const navigate = useNavigate();
  const [data, setData] = React.useState({});

  const {
    data: followed,
    isLoading,
    isSuccess,
  } = useGetFollowedProfilesQuery(username);
  React.useEffect(() => {
    if (followed) {
      setData(followed);
    }
  }, [followed]);
  const handleFollowedAccount = () => {
    navigate("/followedaccount");
  };
  return {
    data,
    handleFollowedAccount,
    isloading: isLoading,
    issuccess: isSuccess,
  };
};
