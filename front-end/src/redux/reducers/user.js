import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    valueFilter: "",
    editAvatar: false,
  },
  reducers: {
    setValueFilter: (state, action) => {
      state.valueFilter = action.payload;
    },
    setEditAvatar: (state, action) => {
      state.editAvatar = action.payload;
    },
  },
});

export const { setValueFilter, setEditAvatar } = userSlice.actions;
export default userSlice;
