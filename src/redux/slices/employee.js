import { createSlice } from "@reduxjs/toolkit";

const initialEmployee = {
  name: "",
  rate: "",
};

const initialState = {
  employee: initialEmployee,
  tokenChecked: false,
};

const { actions, reducer: employeeReducer } = createSlice({
  name: "employee",
  initialState: initialState,
  reducers: {
    saveSuccess: (state, action) => {
      state.employee = {
        ...state.employee,
        ...{ name: action.payload.name, rate: action.payload.rate },
      };
    },
    tokenValid: (state, action) => {
      state.tokenChecked = true;
      state.employee = {
        ...state.employee,
        ...{ name: action.payload.name, rate: action.payload.rate },
      };
    },
    tokenInvalid: (state) => {
      state.tokenChecked = true;
      state.employee = initialEmployee;
    },
  },
});

export default employeeReducer;
export const { saveSuccess, tokenValid, tokenInvalid } = actions;
