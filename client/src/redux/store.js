import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import userMongoReducer from "./slice/userMongoSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    userMongo: userMongoReducer,
  },
});
