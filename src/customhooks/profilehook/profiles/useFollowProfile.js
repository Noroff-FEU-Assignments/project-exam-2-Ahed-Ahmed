import { useState } from "react";
import { useFollowProfileMutation } from "../../../features/profile/profileApiSlice";
import toast from "react-hot-toast";
const useFollowProfiles = (initialProfiles = []) => {
  const [followedProfile] = useFollowProfileMutation();
  const [profiled, setProfiles] = useState(initialProfiles);

  const handleFollowedAccount = async (profileName) => {
    try {
      const response = await followedProfile(profileName);
      if (response.error) {
        toast.error(response.error.data.errors[0].message);
      } else {
        setProfiles((prevProfiles) =>
          prevProfiles.filter((profile) => profile.name !== profileName)
        );
        toast.success("Account Followed");
      }
    } catch (error) {
      console.error("Error handling follow/unfollow:", error);
    }
  };

  return { profiled, handleFollowedAccount, setProfiles };
};

export default useFollowProfiles;
