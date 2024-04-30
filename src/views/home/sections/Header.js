import { Skeleton, Stack, Typography } from "@mui/material";
import useClient from "@src/hooks/useClient";
import { useSelector } from "@src/redux/store";
import React from "react";

const Header = () => {
  const { employee, tokenChecked } = useSelector((state) => state.employee);
  const toRupiah = (amount = 0) => "Rp".concat(amount.toLocaleString("id-ID"));
  const isClient = useClient();

  return (
    <Stack
      direction="row"
      spacing={8}
      px={4}
      py={3}
      borderBottom="2px solid"
      borderColor="neutral700.main"
    >
      {!isClient || !tokenChecked ? (
        <>
          <Stack>
            <Skeleton width="100px" />
            <Skeleton width="200px" />
          </Stack>

          <Stack>
            <Skeleton width="100px" />
            <Skeleton width="200px" />
          </Stack>
        </>
      ) : (
        <>
          <Stack>
            <Typography typography="caption1bold" color="neutral400.main">
              Nama Karyawan
            </Typography>

            <Typography typography="body2" color="neutral300.main">
              {employee.name}
            </Typography>
          </Stack>

          <Stack>
            <Typography typography="caption1bold" color="neutral400.main">
              Rate
            </Typography>

            <Typography typography="body2" color="neutral300.main">
              {toRupiah(employee.rate)}/Jam
            </Typography>
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default Header;
