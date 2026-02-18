import { createSlice } from "@reduxjs/toolkit";

const rel = createSlice({
  name: "reload",
  initialState: {
    reload: false
  },
  reducers: {
    setreload : (state, action) => {
      state.reload = action.payload;
    }
  },
});

export const {setreload}  = rel.actions;
export default rel.reducer;