import React from "react";
import Cookies from "js-cookie";
import { useGetCurrentUserPostDataQuery } from "../../features/posts/PostApiSlice";

export const useGetCurrentUserPosts = () => {
  const currentUserString = Cookies.get("userData") || null;
  const currentUser = JSON.parse(currentUserString) || null;
  let userName;
  if (currentUser !== null) {
    userName = currentUser?.name;
  }
  const { data, isSuccess, isLoading } = useGetCurrentUserPostDataQuery(
    {
      data: {
        name: userName,
      },
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const CurrentUserPostData = React.useMemo(() => {
    const Data = data || [];
    return Data?.map((post) => ({
      id: post?.id,
      title: post?.title,
      description: post?.body,
      tag: post?.tags,
      image: post?.media,
      count: post?._count,
    }));
  }, [data]);
  return {
    currentData: CurrentUserPostData,
    isloading: isLoading,
    issuccess: isSuccess,
  };
};
