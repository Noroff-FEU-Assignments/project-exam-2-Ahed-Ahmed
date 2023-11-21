import { useState } from "react";
import { useUnFollowProfileMutation } from "../../../features/profile/profileApiSlice";
import toast from "react-hot-toast";
export const useUnFollowProfile = (initialProfiles = []) => {
  const [unFollowedProfile] = useUnFollowProfileMutation();
  const [unProfiled, setUnProfiled] = useState(initialProfiles);

  const handleUnFollowedAccount = async (profileName) => {
    try {
      const response = await unFollowedProfile(profileName);
      if (response.error) {
        toast.error(response.error.data.errors[0].message);
      } else {
        setUnProfiled((prevProfiles) =>
          prevProfiles.filter((profile) => profile.name !== profileName)
        );
        toast.success("Account UnFollowed");
      }
    } catch (error) {
      console.error("Error handling follow/unfollow:", error);
    }
  };

  return { unProfiled, handleUnFollowedAccount, setUnProfiled };
};
