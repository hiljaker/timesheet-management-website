import { styled } from "@mui/material/styles";
import { TimePicker } from "@mui/x-date-pickers";

const TimePick = styled(TimePicker)(({ theme }) => ({
  input: {
    ...theme.typography.caption2,
    padding: "8px 12px",
  },

  "& .MuiSvgIcon-root": {
    fontSize: "20px",
  },
}));

export default TimePick;
