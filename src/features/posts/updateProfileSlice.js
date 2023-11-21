// Workable COde
// profileSlice.js
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const currentUserString = Cookies.get("userData") || null;
const currentUser = currentUserString ? JSON.parse(currentUserString) : null;

// const initialState = {
//   currentUser: {
//     profile: currentUser || null,
//     avatar: currentUser?.avatar || null,
//     banner: currentUser?.banner || null,
//   },
// };

const initialState = {
  currentUser: {
    profile: currentUser || null,
    avatar: currentUser?.avatar || null,
    banner: currentUser?.banner || null,
  },
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.currentUser = action.payload;
    },
    updateAvatar: (state, action) => {
      if (state.currentUser) {
        state.currentUser = {
          ...state.currentUser,
          avatar: action.payload,
        };
        Cookies.set("userAvatar", JSON.stringify(action.payload));
      }
    },
    updateBanner: (state, action) => {
      state.currentUser.banner = action.payload;
    },
  },
});

export const { setProfile, updateAvatar, updateBanner } = profileSlice.actions;
export const selectAvatar = (state) => state.profile?.currentUser.avatar;
export default profileSlice.reducer;
