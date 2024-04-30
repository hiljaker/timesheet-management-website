"use client";

import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar, { NAVBAR_HEIGHT } from "./Navbar";
import { usePathname, useRouter } from "next/navigation";

const menus = [
  {
    name: "Daftar Kegiatan",
    url: "/",
  },
  {
    name: "Pengaturan",
    url: "/setting",
  },
];

const Page = ({ children }) => {
  const { push } = useRouter();
  const pathname = usePathname();

  const [activeMenu, setActiveMenu] = useState(menus[0].name);

  useEffect(() => {
    const selectedTab = menus.find((menu) => menu.url === pathname).name;
    setActiveMenu(selectedTab);
  }, [pathname, push]);

  return (
    <Box>
      <Navbar />
      <Box minHeight="100vh" bgcolor="backgroundBrand.main">
        <Box pt={NAVBAR_HEIGHT}>
          <Box
            bgcolor="white"
            pt={2}
            sx={{
              boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.1)",
              WebkitBoxShadow: "0px 1px 5px 0px rgba(0,0,0,0.1)",
            }}
          >
            <Container>
              <Typography
                typography="subheading2bold"
                color="neutral300.main"
                mb={3}
              >
                HH Timesheet
              </Typography>

              <Tabs
                value={activeMenu}
                onChange={(_, value) => setActiveMenu(value)}
                sx={{ minHeight: "28px" }}
              >
                {menus.map((menu) => (
                  <Tab
                    disableRipple
                    key={menu.name}
                    label={menu.name}
                    value={menu.name}
                    onClick={() => push(menu.url)}
                    sx={{
                      textTransform: "capitalize",
                      typography: "caption2bold",
                      padding: "0 16px 12px",
                      minHeight: "28px",
                    }}
                  />
                ))}
              </Tabs>
            </Container>
          </Box>

          <Container sx={{ py: 4 }}>{children}</Container>
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
