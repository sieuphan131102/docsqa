import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  userName: "",
  fullName: "",
  email: "",
  address: "",
  avatar: "",
  access_token: "",
  coin: 0,
  isAdmin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {
        isAdmin,
        userName,
        fullName,
        access_token,
        email,
        address,
        avatar,
        coin,
        _id,
      } = action.payload;
      state.id = _id;
      state.userName = userName;
      state.access_token = access_token;
      state.fullName = fullName;
      state.email = email;
      state.address = address;
      state.avatar = avatar;
      state.coin = coin;
      state.isAdmin = isAdmin;
    },
    resetUser: (state, action) => {
      state.id = "";
      state.userName = "";
      state.access_token = "";
      state.fullName = "";
      state.email = "";
      state.address = "";
      state.avatar = "";
      state.coin = 0;
      state.isAdmin = false;
    },
  },
});

export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
