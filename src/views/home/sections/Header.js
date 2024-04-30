import { Search } from "@mui/icons-material";
import { Skeleton, Stack, Typography } from "@mui/material";
import { TextInput } from "@src/components/TextInput";
import { useSelector } from "@src/redux/store";
import React from "react";

const Header = ({ searchInput = "", setSearchInput = () => {} }) => {
  const { employee, tokenChecked } = useSelector((state) => state.employee);
  const toRupiah = (amount = 0) => "Rp".concat(amount.toLocaleString("id-ID"));

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      px={4}
      py={3}
      borderBottom="2px solid"
      borderColor="neutral700.main"
    >
      <Stack direction="row" spacing={8}>
        {!tokenChecked ? (
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

      <Stack>
        <TextInput
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          size="small"
          sx={{ typography: "caption2", width: "250px" }}
          placeholder="Cari berdasarkan judul"
          InputProps={{
            startAdornment: <Search sx={{ fontSize: "16px" }} />,
          }}
        />
      </Stack>
    </Stack>
  );
};

export default Header;
