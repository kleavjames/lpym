import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import Grid from "@mui/joy/Grid";
import { useDebouncedCallback } from "use-debounce";
import { useCallback, useMemo, useState } from "react";
import { useTallySchools } from "../hooks/useTallySchools";
import { processString } from "../utils/strings";
import TallyCard from "../components/TallyCard";
import Search from "../components/Search";
import SelectCategory from "../components/SelectCategory";

const Tally = () => {
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
      <Grid key={school.uid} xs={12} sm={6} lg={4}>
        <TallyCard key={school.uid} school={school} ranking={i} />
      </Grid>
    ));
  }, [searchedSchools]);

  return (
    <Grid
      container
      sx={{ flexGrow: 1, m: 1, mt: { xs: 7, md: 0 } }}
      spacing={2}
    >
      <Grid xs={12}>
        <Typography level="h1" sx={{ pb: 1, color: "primary.700" }}>
          Tally
        </Typography>
        <Divider sx={{ mb: 2 }} />
      </Grid>
      <Grid xs={12} sm={6}>
        <Search debounced={debounced} />
      </Grid>
      <Grid xs={12} sm={6} sx={{ mb: 2 }}>
        <SelectCategory setCategory={setCategory} />
      </Grid>
      {searchedSchools.length ? (
        renderSchoolCards()
      ) : (
        <Grid xs={12}>
          <Typography
            sx={{
              textAlign: "center",
              color: "primary.plainDisabledColor",
              mt: 2,
            }}
          >
            No school or community found
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default Tally;
