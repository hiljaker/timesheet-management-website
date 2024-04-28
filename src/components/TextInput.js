"use client";

import { TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const LabelInput = ({ children, required = false, ...props }) => {
  return (
    <Typography
      typography="caption2bold"
      color="neutral400.main"
      {...props}
      mb={0.5}
    >
      {children}{" "}
      {required && (
        <Typography
          typography="caption2bold"
          color="redBrand.main"
          component="span"
        >
          *
        </Typography>
      )}
    </Typography>
  );
};

export const TextInput = styled(TextField)(({ theme }) => ({
  borderRadius: "16px",

  "& .MuiOutlinedInput-root": {
    backgroundColor: "white",
    ...theme.typography.caption1,
    color: theme.palette.neutral300.main,
    borderRadius: "8px",

    "&.Mui-focused fieldset": {
      borderColor: theme.palette.blueBrand.main,
    },

    "& textarea": {
      padding: 0,
    },

    "& .MuiInputBase-inputSizeSmall": {
      padding: "8px 12px",
    },
  },
}));
