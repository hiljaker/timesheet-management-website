"use client";

import React from "react";
import { LocalizationProvider as Provider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

const LocalizationProvider = ({ children }) => {
  return <Provider dateAdapter={AdapterDateFns}>{children}</Provider>;
};

export default LocalizationProvider;
