import { Button, Stack, Typography } from "@mui/material";
import { useDeleteActivity, useGetActivity } from "@src/api/activity";
import Modal from "@src/components/Modal";
import React from "react";
import Swal from "sweetalert2";

const DeleteActivityModal = ({ open, onClose, activityId = 0 }) => {
  const { data } = useGetActivity(activityId);
  const { mutateAsync, data: deleteActivityResponse } = useDeleteActivity();

  const onDeleteActivity = async () => {
    try {
      await mutateAsync(activityId);

      onClose();

      Swal.fire({
        icon: "success",
        showConfirmButton: false,
        title: "Berhasil",
        text: deleteActivityResponse?.message || "Berhasil menghapus kegiatan",
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Hapus Kegiatan"
      action={
        <Stack direction="row" spacing={2}>
          <Button variant="text" color="secondary" onClick={onClose}>
            Kembali
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={onDeleteActivity}
          >
            Hapus
          </Button>
        </Stack>
      }
    >
      <Typography>
        Apakah anda yakin menghapus <strong>{data?.title}</strong> ?
      </Typography>
    </Modal>
  );
};

export default DeleteActivityModal;
