import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";

export const NAVBAR_HEIGHT = "64px";

const Navbar = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        width: "100%",
        bgcolor: "white",
        zIndex: 99,
      }}
      boxShadow="0px 1px 5px 0px rgba(0,0,0,0.1)"
    >
      <Container>
        <Stack height={NAVBAR_HEIGHT} justifyContent="center">
          <Stack width="fit-content" alignItems="center">
            <Typography
              typography="body1bold"
              color="redBrand.main"
              sx={{ userSelect: "none" }}
            >
              Timesheet
            </Typography>

            <Typography
              typography="caption1bold"
              color="redBrand.main"
              sx={{ userSelect: "none" }}
            >
              Management
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Navbar;
