import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import SelectCategory from "./components/SelectCategory";
import Search from "./components/Search";
import Stack from "@mui/joy/Stack";
import Divider from "@mui/joy/Divider";
import TallyCard from "./components/TallyCard";
import { useTallySchools } from "./hooks/useTallySchools";
import { useDebouncedCallback } from "use-debounce";
import { useCallback, useMemo, useState } from "react";
import { processString } from "./utils/strings";

const App = () => {
  const { formattedSchools, setCategory } = useTallySchools();
  const [searchValue, setSearchValue] = useState("");

  const searchedSchools = useMemo(() => {
    if (searchValue === "") return formattedSchools;
    return formattedSchools.filter((school) =>
      processString(school.name).includes(processString(searchValue))
    );
  }, [formattedSchools, searchValue]);

  const debounced = useDebouncedCallback(
    useCallback((value) => {
      setSearchValue(value);
    }, []),
    700
  );

  const renderSchoolCards = useCallback(() => {
    return searchedSchools.map((school, i) => (
      <TallyCard key={school.uid} school={school} ranking={i} />
    ));
  }, [searchedSchools]);

  return (
    <Box sx={{ px: 2 }}>
      <Typography level="h1" sx={{ pt: 2, pb: 1, color: "primary.700" }}>
        TALLY
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Stack spacing={2}>
        <Search debounced={debounced} />
        <SelectCategory setCategory={setCategory} />
      </Stack>
      <Stack sx={{ mt: 4 }} spacing={2}>
        {searchedSchools.length ? (
          renderSchoolCards()
        ) : (
          <Box>
            <Typography sx={{textAlign: 'center', color: 'primary.plainDisabledColor', mt: 2}}>No school or community found</Typography>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default App;
