import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  access_token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { userName, fullName, access_token } = action.payload;
      state.name = fullName || userName;
      state.access_token = access_token;
      state.userName = userName;
    },
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
