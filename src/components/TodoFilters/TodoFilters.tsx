import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Filters } from "../../types/types";

interface TodoFiltersProps {
  filters: Filters;
  onFilterChange: (field: keyof Filters, value: string | number) => void;
}

const TodoFilters: React.FC<TodoFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  return (
    <div className="filters">
      <TextField
        label="Title"
        value={filters.title}
        onChange={(e) => onFilterChange("title", e.target.value)}
        fullWidth={true}
      />
      <FormControl fullWidth={true}>
        <InputLabel>Filter by status</InputLabel>
        <Select
          value={filters.status}
          onChange={(e) => onFilterChange("status", e.target.value)}
        >
          <MenuItem value="">Any</MenuItem>
          <MenuItem value="true">Completed</MenuItem>
          <MenuItem value="false">Not completed</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth={true}>
        <InputLabel>Filter by</InputLabel>
        <Select
          value={filters.sortBy}
          onChange={(e) => onFilterChange("sortBy", e.target.value)}
        >
          <MenuItem value="id">Id</MenuItem>
          <MenuItem value="title">Title</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth={true}>
        <InputLabel>Sorting order</InputLabel>
        <Select
          value={filters.sortOrder}
          onChange={(e) => onFilterChange("sortOrder", e.target.value)}
        >
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default TodoFilters;
