// store.js
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import userSlice from "../features/authentication/userSlice";
import { authApi } from "../features/authentication/authApiSlice";

import { PostApi } from "../features/posts/PostApiSlice";
import { ProfileAPi } from "../features/profile/profileApiSlice";

export const store = configureStore({
  reducer: {
    auth: userSlice,
    [authApi.reducerPath]: authApi.reducer,
    [PostApi.reducerPath]: PostApi.reducer,
    [ProfileAPi.reducerPath]: ProfileAPi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      PostApi.middleware,
      ProfileAPi.middleware
    ),
});
setupListeners(store.dispatch);
