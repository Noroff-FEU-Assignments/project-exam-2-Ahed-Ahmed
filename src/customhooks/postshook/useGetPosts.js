import React from "react";
import { useGetPostDataQuery } from "../../features/posts/PostApiSlice";

export const useGetPosts = () => {
  const { data, isSuccess, isLoading } = useGetPostDataQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const HomePostData = React.useMemo(() => {
    const Data = data || [];
    return Data?.map((post) => ({
      id: post?.id,
      title: post?.title,
      description: post?.body,
      image: post?.media,
      count: post?._count,
      comments: post?.comments,
      reactions: post?.reactions,
      user: post?.author,
      time: post?.created,
    }));
  }, [data]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    // Get individual date components
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Adding 1 because months are zero-based
    const day = ("0" + date.getDate()).slice(-2);

    // Create the full date string
    const fullDate = `${year}-${month}-${day}`;
    return fullDate;
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);

    // Get individual time components
    let hours = date.getHours();
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);

    // Determine AM or PM
    const amPM = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    hours = hours % 12 || 12;

    // Create the full time string with AM/PM
    const fullTime = `${hours}:${minutes} ${amPM}`;
    return fullTime;
  };

  return {
    postData: HomePostData,
    isloading: isLoading,
    issuccess: isSuccess,
    postDate: formatDate,
    postTime: formatTime,
  };
};
