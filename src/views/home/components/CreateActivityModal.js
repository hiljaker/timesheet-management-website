import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  FormHelperText,
  Grid,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useCreateActivity, useGetActivity } from "@src/api/activity";
import { useGetProjects } from "@src/api/project";
import DatePick from "@src/components/DatePick";
import Modal from "@src/components/Modal";
import SelectInput from "@src/components/SelectInput";
import { LabelInput, TextInput } from "@src/components/TextInput";
import TimePick from "@src/components/TimePick";
import { useSelector } from "@src/redux/store";
import { useFormik } from "formik";
import React, { useState } from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";
import CreateProjectModal from "./CreateProjectModal";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Judul Kegiatan wajib diisi"),
  projectId: Yup.number().required("Nama Proyek wajib diisi"),
  startDate: Yup.date().required("Tanggal Mulai wajib diisi"),
  endDate: Yup.date()
    .required("Tanggal Berakhir wajib diisi")
    .min(
      Yup.ref("startDate"),
      "Tanggal Berakhir tidak boleh sebelum Tanggal Mulai"
    ),
  startTime: Yup.date().required("Waktu Mulai wajib diisi"),
  endTime: Yup.date()
    .required("Waktu Berakhir wajib diisi")
    .min(
      Yup.ref("startTime"),
      "Waktu Berakhir tidak boleh sebelum Tanggal Mulai"
    ),
});

const CreateActivityModal = ({
  open,
  onClose,
  activityId = 0,
  editMode = false,
}) => {
  const { employee } = useSelector((state) => state.employee);
  const { data: projects } = useGetProjects();
  const { data: activity } = useGetActivity(activityId || 0);
  const { mutateAsync, data: createActivityResponse } = useCreateActivity();

  const [openModal, setOpenModal] = useState(false);

  const {
    values,
    getFieldProps,
    setFieldValue,
    handleSubmit,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      editMode,
      employeeId: employee.id,
      title: activity?.title || "",
      projectId: activity?.projectId || null,
      startDate: activity?.startDate ? new Date(activity.startDate) : null,
      endDate: activity?.endDate ? new Date(activity.endDate) : null,
      startTime: activity?.startTime ? new Date(activity.startTime) : null,
      endTime: activity?.endTime ? new Date(activity.endTime) : null,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await mutateAsync({ values, activityId, editMode });

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text:
            createActivityResponse?.message || "Berhasil menambahkan kegiatan",
          showConfirmButton: false,
          timer: 1500,
        });

        onClose();
        resetForm();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Modal
      title={!editMode === "Create" ? "Tambah Kegiatan Baru" : "Edit Kegiatan"}
      open={open}
      onClose={onClose}
      maxWidth="md"
      action={
        <Stack direction="row" spacing={2}>
          <Button variant="text" color="secondary" onClick={onClose}>
            Kembali
          </Button>
          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            Simpan
          </Button>
        </Stack>
      }
    >
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <LabelInput required>Tanggal Mulai</LabelInput>
          <DatePick
            sx={{ width: "100%" }}
            value={values.startDate}
            onChange={(value) => setFieldValue("startDate", value)}
            slotProps={{
              textField: {
                error: touched.startDate && errors.startDate,
                helperText: touched.startDate && errors.startDate,
              },
            }}
          />
        </Grid>

        <Grid item xs={3}>
          <LabelInput required>Tanggal Berakhir</LabelInput>
          <DatePick
            sx={{ width: "100%" }}
            value={values.endDate}
            onChange={(value) => setFieldValue("endDate", value)}
            slotProps={{
              textField: {
                error: touched.endDate && errors.endDate,
                helperText: touched.endDate && errors.endDate,
              },
            }}
          />
        </Grid>

        <Grid item xs={3}>
          <LabelInput required>Waktu Mulai</LabelInput>
          <TimePick
            ampm={false}
            sx={{ width: "100%" }}
            value={values.startTime}
            onChange={(value) => setFieldValue("startTime", value)}
            slotProps={{
              textField: {
                error: touched.startTime && errors.startTime,
                helperText: touched.startTime && errors.startTime,
              },
            }}
          />
        </Grid>

        <Grid item xs={3}>
          <LabelInput required>Waktu Berakhir</LabelInput>
          <TimePick
            ampm={false}
            sx={{ width: "100%" }}
            value={values.endTime}
            onChange={(value) => setFieldValue("endTime", value)}
            slotProps={{
              textField: {
                error: touched.endTime && errors.endTime,
                helperText: touched.endTime && errors.endTime,
              },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <LabelInput required>Judul Kegiatan</LabelInput>
          <TextInput
            {...getFieldProps("title")}
            fullWidth
            size="small"
            error={touched.title && errors.title}
            helperText={touched.title && errors.title}
          />
        </Grid>

        <Grid item xs={12}>
          <LabelInput required>Nama Proyek</LabelInput>
          <SelectInput
            fullWidth
            value={values.projectId}
            onChange={(event) => setFieldValue("projectId", event.target.value)}
            error={touched.projectId && errors.projectId}
          >
            <MenuItem
              value=""
              onClickCapture={(e) => {
                e.stopPropagation();
                setOpenModal(true);
              }}
            >
              <Stack
                color="redBrand.main"
                direction="row"
                alignItems="center"
                spacing={0.5}
              >
                <Add sx={{ fontSize: "14px" }} />{" "}
                <Typography typography="caption1bold">Tambah Proyek</Typography>
              </Stack>
            </MenuItem>
            {projects?.map((project) => (
              <MenuItem
                key={project.name}
                sx={{ typography: "caption1" }}
                value={project.id}
              >
                {project.name}
              </MenuItem>
            ))}
          </SelectInput>
          {Boolean(touched.projectId && errors.projectId) && (
            <FormHelperText error sx={{ m: "4px 14px 0" }}>
              {errors.projectId}
            </FormHelperText>
          )}
        </Grid>
      </Grid>

      <CreateProjectModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </Modal>
  );
};

export default CreateActivityModal;
