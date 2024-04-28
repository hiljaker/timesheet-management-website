import { combineReducers } from "redux";
import employeeReducer from "./slices/employee";

const rootReducer = combineReducers({
  employee: employeeReducer,
});

export { rootReducer };
