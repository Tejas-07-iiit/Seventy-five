import { createSlice } from "@reduxjs/toolkit";

const ComponentSlice = createSlice({
  name: "comp",
  initialState: {
    comp: "homePage"
  },
  reducers: {
    comp : (state, action) => {
      state.comp = action.payload;
    }
  },
});

export const {comp}  = ComponentSlice.actions;
export default ComponentSlice.reducer;
