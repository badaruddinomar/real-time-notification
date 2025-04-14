import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  isAuthenticated: boolean | null;
  accessToken: string | null;
  user: null;
}
const initialState: IInitialState = {
  isAuthenticated: false,
  accessToken: "",
  user: null,
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeUserFromStore: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { removeUserFromStore } = userReducer.actions;

export default userReducer.reducer;
