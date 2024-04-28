export const ContainerOverride = {
  defaultProps: {
    disableGutters: true,
  },
  styleOverrides: {
    root: ({ theme }) => ({
      padding: "0px 64px",

      [theme.breakpoints.down("md")]: {
        padding: "0px 24px",
      },
    }),
  },
};
