import { Button, Stack } from "@mui/material";
import { useCreateProject } from "@src/api/project";
import Modal from "@src/components/Modal";
import { LabelInput, TextInput } from "@src/components/TextInput";
import { useFormik } from "formik";
import React from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";

const CreateProjectModal = ({ open, onClose }) => {
  const { mutateAsync } = useCreateProject();

  const { handleSubmit, errors, touched, getFieldProps } = useFormik({
    initialValues: { name: "" },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Nama Proyek wajib diisi"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await mutateAsync(values);

        Swal.fire({
          icon: "success",
          showConfirmButton: false,
          title: "Berhasil",
          text: "Berhasil menambahkan proyek",
          timer: 1500,
        });

        onClose();
        resetForm();
      } catch (error) {
        Swal.fire({
          icon: "error",
          showConfirmButton: false,
          title: "Gagal",
          text: error.message || "Nama proyek sudah ada",
          timer: 1500,
        });
      }
    },
  });

  return (
    <Modal
      title="Tambah Proyek Baru"
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
          <Button variant="text" color="secondary" onClick={onClose}>
            Kembali
          </Button>
          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            Simpan
          </Button>
        </Stack>
      }
    >
      <LabelInput required>Nama Proyek</LabelInput>
      <TextInput
        {...getFieldProps("name")}
        size="small"
        fullWidth
        error={Boolean(errors.name) && touched.name}
        helperText={touched.name && errors.name}
      />
    </Modal>
  );
};

export default CreateProjectModal;
