import { Select } from "@mui/material";
import { styled } from "@mui/material/styles";

const SelectInput = styled(Select)(({ theme }) => ({
  "& .MuiSelect-select": { padding: "8px 12px", ...theme.typography.caption1 },
}));

export default SelectInput;
