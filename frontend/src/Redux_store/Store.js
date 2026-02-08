import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth";
import compReducer from "./Comp"
import EditAtt from "./Attedit";

const Store =  configureStore({
  reducer: {
    auth: authReducer,
    comp : compReducer,
    edit : EditAtt
  },
});

// console.log(Store)
export default Store;
