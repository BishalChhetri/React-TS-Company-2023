import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserData, setUserData, resetUserData } from "../utils/Utils";
import { UserData } from "../types/types.d";

interface UserState {
  isLoggedIn: boolean;
  userData: UserData | null;
}

const initialUserData = getUserData();

const initialState: UserState = {
  isLoggedIn: !!initialUserData,
  userData: initialUserData,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ isRemember: boolean; userData: UserData }>
    ) => {
      state.isLoggedIn = true;
      state.userData = action.payload.userData;
      setUserData(action.payload.isRemember, action.payload.userData);
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.userData = null;
      resetUserData();
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
