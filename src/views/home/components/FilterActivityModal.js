import { Box, Button, Chip, MenuItem, Stack } from "@mui/material";
import { useGetProjects } from "@src/api/project";
import Modal from "@src/components/Modal";
import SelectInput from "@src/components/SelectInput";
import { LabelInput } from "@src/components/TextInput";
import navigate from "@src/helpers/navigate";
import qs from "query-string";
import React, { useState } from "react";

const FilterActivityModal = ({ open, onClose }) => {
  const url = typeof window !== "undefined" && window.location.href;
  const { query } = qs.parseUrl(url || "");

  const { data: projects } = useGetProjects();
  const [selectedProjects, setSelectedProjects] = useState(
    query.projects || []
  );

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    const projectsToSet = typeof value === "string" ? value.split(",") : value;

    setSelectedProjects(projectsToSet);
  };

  const onSetFilter = () => {
    const queryParams = query;

    if (!selectedProjects.length) {
      delete queryParams.projects;
    } else {
      queryParams.projects = selectedProjects;
    }

    navigate(`/?${qs.stringify(queryParams)}`);
    onClose();
  };

  return (
    <Modal
      title="Filter"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "500px",
          },
        },
      }}
      action={
        <Stack direction="row" spacing={2}>
          <Button
            variant="text"
            color="secondary"
            onClick={() => setSelectedProjects([])}
          >
            Hapus Filter
          </Button>
          <Button variant="contained" color="secondary" onClick={onSetFilter}>
            Terapkan
          </Button>
        </Stack>
      }
    >
      <LabelInput>Proyek</LabelInput>
      <SelectInput
        multiple
        value={selectedProjects}
        onChange={handleChange}
        fullWidth
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip
                key={value}
                label={value}
                clickable
                onMouseDown={(event) => event.stopPropagation()}
                onDelete={(event) => {
                  const restOfSelectedProjects = selectedProjects.filter(
                    (project) => project !== value
                  );
                  setSelectedProjects(restOfSelectedProjects);
                }}
              />
            ))}
          </Box>
        )}
        MenuProps={{
          sx: {
            "&& .Mui-selected": {
              bgcolor: "blueBrand.main",
              color: "white",

              "&:hover": {
                bgcolor: "blueBrand.main",
              },
            },
          },
        }}
      >
        {projects?.map((project) => (
          <MenuItem key={project.name} value={project.name}>
            {project.name}
          </MenuItem>
        ))}
      </SelectInput>
    </Modal>
  );
};

export default FilterActivityModal;
