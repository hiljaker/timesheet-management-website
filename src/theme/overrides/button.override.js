import { colors } from "../palette.custom";

export const ButtonOverride = {
  defaultProps: {
    variant: "primary",
    size: "medium",
    disableRipple: true,
  },
  styleOverrides: {
    root: ({ theme }) => ({
      textTransform: "capitalize",
      ...theme.typography.caption2bold,
      borderRadius: "8px",
      boxShadow: "none",

      "&:hover": {
        boxShadow: "none",
      },
    }),
    sizeSmall: {
      padding: "6px 12px",
      fontSize: "12px",
    },
    sizeMedium: {
      padding: "8px 16px",
      fontSize: "14px",
    },
    sizeLarge: {
      padding: "12px 24px",
      fontSize: "16px",
    },
    containedPrimary: {
      backgroundColor: colors.blueBrand,
    },
    textPrimary: {
      color: colors.blueBrand,
      backgroundColor: colors.lightBlueBrand,
    },
    outlinedPrimary: {
      color: colors.blueBrand,
      borderColor: colors.blueBrand,

      "&:hover": {
        borderColor: colors.blueBrand,
      },
    },
  },
};
