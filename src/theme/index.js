import { createTheme } from "@mui/material";
import { customTypography } from "./typography.custom";
import { customPalette } from "./palette.custom";
import { customComponents } from "./component.custom";
import { customBreakpoints } from "./breakpoints.custom";

export const theme = createTheme({
  typography: customTypography,
  palette: customPalette,
  components: customComponents,
  breakpoints: customBreakpoints,
});
