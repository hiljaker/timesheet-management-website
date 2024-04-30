"use client";

import { AddCircleOutline, FilterList, Search } from "@mui/icons-material";
import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import { useGetActivities } from "@src/api/activity";
import React, { useCallback, useEffect, useState } from "react";
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@uidotdev/usehooks";
import Header from "./sections/Header";
import Content from "./sections/Content";
import CreateActivityModal from "./components/CreateActivityModal";
import { TextInput } from "@src/components/TextInput";
import FilterActivityModal from "./components/FilterActivityModal";

const HomeView = () => {
  const url = typeof window !== "undefined" && window.location.href;

  const { query } = qs.parseUrl(url || "");
  const { push } = useRouter();
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("search");

  const [searchInput, setSearchInput] = useState(searchQuery || "");
  const debouncedSearchInput = useDebounce(searchInput, 500);

  const handleSearchInput = useCallback(() => {
    const searchQuery = query;

    if (!debouncedSearchInput) {
      delete searchQuery.search;
    } else {
      searchQuery.search = debouncedSearchInput;
    }

    push(`?${qs.stringify(searchQuery)}`);
  }, [debouncedSearchInput, push, query]);

  useEffect(() => {
    handleSearchInput();
  }, [handleSearchInput]);

  const { data: activities, isLoading } = useGetActivities({
    search: searchQuery,
    projects: query.projects,
  });

  const [openModal, setOpenModal] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);

  return (
    <Box
      bgcolor="white"
      borderRadius="18px"
      boxShadow="0px 0px 10px 0px rgba(0,0,0,0.1)"
    >
      <Header searchInput={searchInput} setSearchInput={setSearchInput} />

      <Stack px={4} py={3}>
        <Stack spacing={2}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography typography="body1bold" color="neutral300.main">
                Daftar Kegiatan
              </Typography>
              <Button variant="text" onClick={() => setOpenModal(true)}>
                <AddCircleOutline sx={{ mr: 1, fontSize: "16px" }} /> Tambah
                Kegiatan
              </Button>
            </Stack>

            <Stack direction="row" spacing={1}>
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

              <Stack
                alignItems="center"
                justifyContent="center"
                border="1px solid"
                borderColor="neutral500.main"
                borderRadius="4px"
                p={0.5}
                sx={{ cursor: "pointer" }}
                onClick={() => setOpenFilterModal(true)}
              >
                <FilterList sx={{ color: "redBrand.main" }} />
              </Stack>
            </Stack>
          </Stack>

          {isLoading ? (
            <Stack>
              <Skeleton width="100%" height="50px" />
              <Skeleton width="100%" height="50px" />
              <Skeleton width="100%" height="50px" />
              <Skeleton width="100%" height="50px" />
            </Stack>
          ) : (
            <Box
              borderRadius="14px"
              overflow="hidden"
              sx={{ outline: "1px solid", outlineColor: "neutral700.main" }}
            >
              <Content activities={activities} isLoading={isLoading} />
            </Box>
          )}
        </Stack>
      </Stack>

      <CreateActivityModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />

      <FilterActivityModal
        open={openFilterModal}
        onClose={() => setOpenFilterModal(false)}
      />
    </Box>
  );
};

export default HomeView;
