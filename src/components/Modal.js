import { Clear } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const Modal = ({ open, onClose, title, children, action, ...props }) => {
  return (
    <Dialog open={open} onClose={onClose} {...props}>
      <DialogTitle borderBottom="2px solid" borderColor="neutral700.main">
        <Stack
          width="100%"
          direction="row"
          alignItems="center"
          justifyContent={title ? "space-between" : "flex-end"}
        >
          {Boolean(title) && (
            <Typography typography="body1bold">{title}</Typography>
          )}

          <IconButton onClick={onClose}>
            <Clear />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ p: "16px 24px!important" }}>
        {children}
      </DialogContent>

      {Boolean(action) && (
        <DialogActions
          sx={{
            p: "16px 24px",
            borderTop: "2px solid",
            borderColor: "neutral700.main",
          }}
        >
          {action}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default Modal;
