import { styled } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers";

const DatePick = styled(DatePicker)(({ theme }) => ({
  input: {
    ...theme.typography.caption2,
    padding: "8px 12px",
  },

  "& .MuiSvgIcon-root": {
    fontSize: "20px",
  },
}));

export default DatePick;
