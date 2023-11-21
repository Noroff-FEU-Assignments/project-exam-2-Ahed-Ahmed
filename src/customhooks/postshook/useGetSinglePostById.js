// import React from "react";
// import axiosUniversal from "../../apicall/api";

// export const useGetSinglePostByID = () => {
//   const [singledata, setSingleData] = React.useState({});
//   const [isloading, setloading] = React.useState(false);
//   const [error, setError] = React.useState(null);
//   const [singlePostModal, setSinglePostModal] = React.useState(false);

//   const handleSinglePostById = async (postId) => {
//     try {
//       setloading(true);
//       const response = await axiosUniversal(`posts/${postId}`, "get", {});
//       if (response) {
//         setSingleData(response);
//         setSinglePostModal(true);
//         setloading(false);
//       }
//     } catch (error) {
//       setError(error.response.data.errors[0].message);
//     }
//   };
//   return {
//     singlePostModal,
//     setSinglePostModal,
//     singledata,
//     error,
//     isloading,
//     handleSinglePostById,
//   };
// };
