import {
  DeleteOutline,
  DriveFileRenameOutline,
  ExpandLess,
  ExpandMore,
  UnfoldMore,
} from "@mui/icons-material";
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useSelector } from "@src/redux/store";
import { format, formatDuration } from "date-fns";
import React, { useMemo, useState } from "react";
import CreateActivityModal from "../components/CreateActivityModal";
import DeleteActivityModal from "../components/DeleteActivityModal";
import queryString from "query-string";
import navigate from "@src/helpers/navigate";

const Cell = ({ children, head = false, sortable, order, ...props }) => {
  return (
    <TableCell
      sx={{
        borderRight: "1px solid",
        borderBottom: "1px solid",
        borderColor: "neutral700.main",
        "&:last-child": {
          borderRight: "none",
        },
      }}
      {...props}
    >
      <Stack
        sx={{ cursor: "pointer" }}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography typography={head ? "caption1bold" : "caption1"}>
          {children}
        </Typography>

        {sortable && (
          <>
            {order === "asc" && <ExpandLess sx={{ fontSize: "16px" }} />}
            {order === "desc" && <ExpandMore sx={{ fontSize: "16px" }} />}
            {!["asc", "desc"].includes(order) && (
              <UnfoldMore sx={{ fontSize: "16px" }} />
            )}
          </>
        )}
      </Stack>
    </TableCell>
  );
};

const Content = ({ activities = [], isLoading = false }) => {
  const url = typeof window !== "undefined" && window.location.href;
  const { query } = queryString.parseUrl(url || "");

  const { employee } = useSelector((state) => state.employee);

  const toRupiah = (amount = 0) => "Rp".concat(amount.toLocaleString("id-ID"));

  const msToHoursMinutes = (ms) => {
    const duration = formatDuration({
      hours: Math.floor(ms / (1000 * 60 * 60)),
      minutes: Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60)),
    });
    return duration;
  };

  const totalDuration = useMemo(() => {
    let total = 0;

    activities.map((activity) => {
      total += activity.duration;
    });

    return total;
  }, [activities]);

  const totalIncome = useMemo(() => {
    const incomePerMinute = employee.rate / 60;
    const totalMinutes = totalDuration / (1000 * 60);

    return totalMinutes * incomePerMinute;
  }, [employee.rate, totalDuration]);

  const [activityId, setActivityId] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const onEditClick = (target) => {
    setActivityId(target);
    setOpenModal(true);
  };

  const onDeleteClick = (target) => {
    setActivityId(target);
    setOpenDeleteModal(true);
  };

  const sortedFields = [
    { title: "Judul Kegiatan", field: "title" },
    { title: "Proyek", field: "project" },
    { title: "Tanggal Mulai", field: "startDate" },
    { title: "Tanggal Berakhir", field: "endDate" },
    { title: "Waktu Mulai", field: "startTime" },
    { title: "Waktu Berakhir", field: "endTime" },
    { title: "Durasi", field: "duration" },
  ];

  const handleSort = (field = "") => {
    const searchParams = query;

    const restOfFields = sortedFields.filter(
      (sortedField) => sortedField.field !== field
    );

    restOfFields.forEach((restOfField) => {
      delete searchParams[restOfField.field];
    });

    if (searchParams[field]) {
      if (searchParams[field] === "asc") {
        searchParams[field] = "desc";
      } else if (searchParams[field] === "desc") {
        delete searchParams[field];
      }
    } else {
      searchParams[field] = "asc";
    }

    navigate(`?${queryString.stringify(searchParams)}`);
  };

  return (
    <>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {sortedFields.map(({ title, field }) => (
              <Cell
                key={title}
                head
                sortable
                order={query[field]}
                onClick={() => handleSort(field)}
              >
                {title}
              </Cell>
            ))}
            <Cell head>Aksi</Cell>
          </TableRow>
        </TableHead>

        <TableBody>
          {activities?.map((activity) => (
            <TableRow
              key={activity.title}
              sx={{
                "&:last-child td, &:last-child th": { borderBottom: 0 },
              }}
            >
              <Cell>{activity.title}</Cell>
              <Cell>{activity.project.name}</Cell>
              <Cell>{format(new Date(activity.startDate), "d MMM yyyy")}</Cell>
              <Cell>{format(new Date(activity.endDate), "d MMM yyyy")}</Cell>
              <Cell>{format(new Date(activity.startTime), "HH:mm")}</Cell>
              <Cell>{format(new Date(activity.endTime), "HH:mm")}</Cell>
              <Cell>{msToHoursMinutes(activity.duration)}</Cell>
              <Cell>
                <Stack direction="row" spacing={0.5}>
                  <Stack
                    width="fit-content"
                    p={0.5}
                    border="1px solid"
                    borderColor="neutral700.main"
                    borderRadius="4px"
                    sx={{ cursor: "pointer" }}
                    onClick={() => onEditClick(activity.id)}
                  >
                    <DriveFileRenameOutline sx={{ color: "redBrand.main" }} />
                  </Stack>

                  <Stack
                    width="fit-content"
                    p={0.5}
                    border="1px solid"
                    borderColor="neutral700.main"
                    borderRadius="4px"
                    sx={{ cursor: "pointer" }}
                    onClick={() => onDeleteClick(activity.id)}
                  >
                    <DeleteOutline sx={{ color: "redBrand.main" }} />
                  </Stack>
                </Stack>
              </Cell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {!isLoading && activities?.length === 0 && (
        <Stack alignItems="center" justifyContent="center" py={8}>
          <Typography typography="body2bold" color="neutral500.main">
            Belum ada kegiatan
          </Typography>
        </Stack>
      )}

      <Stack bgcolor="neutral700.main" p={2} spacing={1}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography typography="body2" color="blueBrand.main">
            Total Durasi
          </Typography>
          <Typography typography="body2" color="blueBrand.main">
            {!totalDuration ? "-" : msToHoursMinutes(totalDuration)}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography typography="body1bold" color="blueBrand.main">
            Total Pendapatan
          </Typography>
          <Typography typography="body1bold" color="blueBrand.main">
            {!totalIncome ? "-" : toRupiah(totalIncome)}
          </Typography>
        </Stack>
      </Stack>

      <CreateActivityModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        activityId={activityId}
        editMode
      />

      <DeleteActivityModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        activityId={activityId}
      />
    </>
  );
};

export default Content;
