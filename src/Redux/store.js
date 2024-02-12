import { configureStore } from "@reduxjs/toolkit";
import userDetailSlice from "./Slices/UserDetails";
const store = configureStore({
  reducer: {
    app: userDetailSlice,
  },
});
export default store;
