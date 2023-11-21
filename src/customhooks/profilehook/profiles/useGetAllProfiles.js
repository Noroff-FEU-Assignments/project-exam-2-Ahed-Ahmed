import React, { useEffect } from "react";
import { useGetAllProfileQuery } from "../../../features/profile/profileApiSlice";

export const useGetAllProfiles = () => {
  const { data, isSuccess, isLoading } = useGetAllProfileQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const shuffleArray = (array) => {
    if (!array || !Array.isArray(array)) {
      return [];
    }
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const [shuffledProfiles, setShuffledProfiles] = React.useState([]);

  useEffect(() => {
    if (isSuccess && data) {
      const shuffledData = shuffleArray(data);
      setShuffledProfiles(shuffledData);

      const shuffleInterval = setInterval(() => {
        const refreshedData = shuffleArray(data);
        setShuffledProfiles(refreshedData);
      }, 5 * 60 * 1000); // 1 minute interval

      return () => clearInterval(shuffleInterval);
    }
  }, [data, isSuccess]);

  const Profiles = React.useMemo(() => {
    return shuffledProfiles.map((profile) => ({
      name: profile?.name,
      email: profile?.email,
      banner: profile?.banner,
      avatar: profile?.avatar,
      count: profile?._count,
    }));
  }, [shuffledProfiles]);

  return {
    ProfileData: Profiles,
    isloading: isLoading,
    issuccess: isSuccess,
  };
};
