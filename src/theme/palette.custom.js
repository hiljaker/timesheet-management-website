import { createTheme } from "@mui/material";

const theme = createTheme();

export const colors = {
  redBrand: "#F15858",
  blueBrand: "#2775EC",
  lightBlueBrand: "#F0F6FF",
  backgroundBrand: "#F7F8FB",

  neutral100: "#171717",
  neutral200: "#262626",
  neutral300: "#434343",
  neutral400: "#8C8C8C",
  neutral500: "#BFBFBF",
  neutral600: "#D9D9D9",
  neutral700: "#F0F0F0",
  neutral800: "#FAFAFA",
  neutral900: "#FFFFFF",
};

export const customPalette = {
  // GENERAL //
  redBrand: {
    main: colors.redBrand,
    contrastText: theme.palette.getContrastText(colors.redBrand),
  },
  blueBrand: {
    main: colors.blueBrand,
    contrastText: theme.palette.getContrastText(colors.blueBrand),
  },
  lightBlueBrand: {
    main: colors.lightBlueBrand,
    contrastText: theme.palette.getContrastText(colors.lightBlueBrand),
  },
  backgroundBrand: {
    main: colors.backgroundBrand,
    contrastText: theme.palette.getContrastText(colors.backgroundBrand),
  },

  // NEUTRAL
  neutral100: {
    main: colors.neutral100,
    contrastText: theme.palette.getContrastText(colors.neutral100),
  },
  neutral200: {
    main: colors.neutral200,
    contrastText: theme.palette.getContrastText(colors.neutral200),
  },
  neutral300: {
    main: colors.neutral300,
    contrastText: theme.palette.getContrastText(colors.neutral300),
  },
  neutral400: {
    main: colors.neutral400,
    contrastText: theme.palette.getContrastText(colors.neutral400),
  },
  neutral500: {
    main: colors.neutral500,
    contrastText: theme.palette.getContrastText(colors.neutral500),
  },
  neutral600: {
    main: colors.neutral600,
    contrastText: theme.palette.getContrastText(colors.neutral600),
  },
  neutral700: {
    main: colors.neutral700,
    contrastText: theme.palette.getContrastText(colors.neutral700),
  },
  neutral800: {
    main: colors.neutral800,
    contrastText: theme.palette.getContrastText(colors.neutral800),
  },
  neutral900: {
    main: colors.neutral900,
    contrastText: theme.palette.getContrastText(colors.neutral900),
  },
};
