import Login from "./pages/login/Login";
import Layout from "./layout/Layout";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import AddPost from "./pages/addpost/AddPost";
import FollowedProfile from "./pages/followedprofile/FollowedProfile";
import EditPost from "./pages/editpost/EditPost";
import Register from "./pages/register/Register";
import SingleProfileByName from "./pages/singleprofilebyname/SingleProfileByName";
import { Toaster } from "react-hot-toast";
import "./App.css";
import AllUserPrfofiles from "./pages/alluserprofiles/AllUserProfiles";
import MobileAllUserProfiles from "./pages/alluserprofiles/mobileuserprofile/MobileUserProfile";
import ViewPost from "./pages/viewpost/ViewPost";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoutes />,
      children: [
        {
          path: "/",
          element: <Layout />,
          children: [
            {
              index: true,
              element: <Home />,
            },
            {
              path: "profile",
              element: <Profile />,
            },
            {
              path: "singleprofile/:username",
              element: <SingleProfileByName />,
            },
            {
              path: "addpost",
              element: <AddPost />,
            },
            {
              path: "singlepost/:id",
              element: <ViewPost />,
            },
            {
              path: "editpost/:id",
              element: <EditPost />,
            },
            {
              path: "followedaccount",
              element: <FollowedProfile />,
            },
            {
              path: "userprofiles",
              element: <AllUserPrfofiles />,
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <div>
      <Toaster />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
