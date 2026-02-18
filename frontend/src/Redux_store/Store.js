import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth";
import compReducer from "./Comp"
import EditAtt from "./Attedit";
import setreload from "./Reload"

const Store =  configureStore({
  reducer: {
    auth: authReducer,
    comp : compReducer,
    edit : EditAtt,
    rel : setreload
  },
});

// console.log(Store)
export default Store;
