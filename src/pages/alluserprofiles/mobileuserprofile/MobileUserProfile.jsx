// import React from "react";
// import SearchOutlined from "@mui/icons-material/SearchOutlined";
// import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
// import CircularProgress from "@mui/material/CircularProgress";
// import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
// import { useNavigate } from "react-router-dom";
// import { useGetAllProfiles } from "../../../customhooks/profilehook/profiles/useGetAllProfiles";
// import useFollowProfiles from "../../../customhooks/profilehook/profiles/useFollowProfile";
// import { useGetMobileUserProfile } from "../../../customhooks/profilehook/profiles/useMobileProfileByName";

// const MobileAllUserProfiles = () => {
//   const navigate = useNavigate();
//   const { ProfileData, isloading } = useGetAllProfiles();
//   const { handleFollowedAccount } = useFollowProfiles();
//   const {
//     username,
//     setUsername,
//     profileMobileData,
//     isLoading,
//     getUserProfile,
//     clearProfileData,
//     setMobileProfileData,
//     error,
//   } = useGetMobileUserProfile();

//   React.useEffect(() => {
//     window.scrollTo(0, 0, { behavior: "smooth" });
//   }, []);

//   const handleViewProfileByName = (username) => {
//     navigate(`/singleprofile/${username}`);
//   };

//   const handleMobileSearch = () => {
//     getUserProfile(username);
//   };

//   const handleClear = () => {
//     clearProfileData();
//     setUsername("");
//     navigate("/userprofiles");
//   };
//   const handleBack = () => {
//     clearProfileData();
//     setUsername("");
//     navigate("/userprofiles");
//   };

//   if (isloading || isLoading) {
//     return (
//       <div
//         style={{
//           width: "100%",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "8vh",
//         }}
//       >
//         <CircularProgress />
//       </div>
//     );
//   }

//   return (
//     <div className="followed-profiles">
//       <div>
//         <input
//           type="text"
//           placeholder="Search..."
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <SearchOutlined
//           sx={{ cursor: "pointer" }}
//           onClick={handleMobileSearch}
//         />
//         {profileMobileData && (
//           <ClearOutlinedIcon
//             style={{
//               fontSize: "18px",
//               color: "#404040",
//               cursor: "pointer",
//             }}
//             onClick={handleClear}
//           />
//         )}
//       </div>
//       <div className="top-text-container">
//         <p className="toptext">All User Profiles</p>
//       </div>
//       {profileMobileData ? (
//         <div className="info-main">
//           {/* Display single user profile */}
//           <div
//             className="image-text-container"
//             onClick={() => {
//               handleViewProfileByName(profileMobileData?.name);
//             }}
//             style={{ cursor: "pointer" }}
//           >
//             <div className="image">
//               <img src={profileMobileData?.avatar} alt="user" />
//             </div>
//             <div className="namefollowing-container">
//               <div className="text">
//                 <p>{profileMobileData?.name}</p>
//               </div>
//               <div className="followers-container">
//                 <span>Followers</span>
//                 <p>{profileMobileData?.count?.following}</p>
//               </div>
//             </div>
//           </div>
//           <div className="follow">
//             <BookmarkOutlinedIcon
//               style={{
//                 fontSize: "18px",
//                 marginTop: "8px",
//                 color: "#404040",
//                 cursor: "pointer",
//               }}
//               onClick={(e) => {
//                 handleFollowedAccount(profileMobileData?.name);
//               }}
//             />
//           </div>
//         </div>
//       ) : error ? (
//         <>
//           <p>No profile data available</p>
//           <ClearOutlinedIcon
//             style={{
//               fontSize: "18px",
//               color: "#404040",
//               cursor: "pointer",
//             }}
//             onClick={handleClear}
//           />
//         </>
//       ) : ProfileData && ProfileData.length ? (
//         ProfileData.map((singleprofile, index) => (
//           <div className="info-main" key={index}>
//             <div
//               className="image-text-container"
//               onClick={() => {
//                 handleViewProfileByName(singleprofile?.name);
//               }}
//               style={{ cursor: "pointer" }}
//             >
//               <div className="image">
//                 <img src={singleprofile?.avatar} alt="user" />
//               </div>
//               <div className="namefollowing-container">
//                 <div className="text">
//                   <p>{singleprofile?.name}</p>
//                 </div>
//                 <div className="followers-container">
//                   <span>Followers</span>
//                   <p>{singleprofile?.count?.following}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="follow">
//               <BookmarkOutlinedIcon
//                 style={{
//                   fontSize: "18px",
//                   marginTop: "8px",
//                   color: "#404040",
//                   cursor: "pointer",
//                 }}
//                 onClick={(e) => {
//                   handleFollowedAccount(singleprofile?.name);
//                 }}
//               />
//             </div>
//           </div>
//         ))
//       ) : (
//         ""
//       )}
//     </div>
//   );
// };

// export default MobileAllUserProfiles;
