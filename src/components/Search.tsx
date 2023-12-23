import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import { FC } from "react";
import { DebouncedState } from "use-debounce";

type SearchProps = {
  debounced: DebouncedState<(value: string) => void>;
};

const Search: FC<SearchProps> = ({ debounced }) => {
  return (
    <FormControl>
      <FormLabel>Search</FormLabel>
      <Input
        type="search"
        placeholder="Search school / community"
        onChange={(e) => debounced(e.target.value)}
      />
    </FormControl>
  );
};

export default Search;
