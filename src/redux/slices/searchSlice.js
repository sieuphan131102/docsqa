import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  text: "",
};
export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.text = action.payload;
    },
    setSearchType: (state, action) => {
      state.text = action.payload;
    },
    setSearchDoc: (state, action) => {
      state.text = action.payload;
    },
  },
});

export const { setSearchText, setSearchType, setSearchDoc } =
  searchSlice.actions;

export default searchSlice.reducer;
