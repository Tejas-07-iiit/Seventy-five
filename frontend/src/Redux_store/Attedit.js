import { createSlice } from "@reduxjs/toolkit";

const EditAtt = createSlice({
  name: "edit",
  initialState: {
    edit: null
  },
  reducers: {
    setEdit : (state, action) => {
      state.edit = action.payload;
    }
  },
});

export const {setEdit}  = EditAtt.actions;
export default EditAtt.reducer;