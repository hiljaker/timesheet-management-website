"use client";

import React from "react";
import { ThemeProvider } from "@mui/material";
import { theme } from "@src/theme";

const MUIThemeProvider = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MUIThemeProvider;
