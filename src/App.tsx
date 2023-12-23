// import Typography from "@mui/joy/Typography";
// import SelectCategory from "./components/SelectCategory";
// import Search from "./components/Search";
// import Divider from "@mui/joy/Divider";
// import Grid from "@mui/joy/Grid";
import Box from "@mui/joy/Box";
// import TallyCard from "./components/TallyCard";
// import { useTallySchools } from "./hooks/useTallySchools";
// import { useDebouncedCallback } from "use-debounce";
// import { useCallback, useMemo, useState } from "react";
// import { processString } from "./utils/strings";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Tally from "./pages/Tally";
import { Route, Routes } from "react-router-dom";
import Results from "./pages/Results";

const App = () => {
  // const { formattedSchools, setCategory } = useTallySchools();
  // const [searchValue, setSearchValue] = useState("");

  // const searchedSchools = useMemo(() => {
  //   if (searchValue === "") return formattedSchools;
  //   return formattedSchools.filter((school) =>
  //     processString(school.name).includes(processString(searchValue))
  //   );
  // }, [formattedSchools, searchValue]);

  // const debounced = useDebouncedCallback(
  //   useCallback((value) => {
  //     setSearchValue(value);
  //   }, []),
  //   700
  // );

  // const renderSchoolCards = useCallback(() => {
  //   return searchedSchools.map((school, i) => (
  //     <Grid key={school.uid} xs={12} sm={6} lg={4}>
  //       <TallyCard key={school.uid} school={school} ranking={i} />
  //     </Grid>
  //   ));
  // }, [searchedSchools]);

  return (
    <Box sx={{ display: "flex", minHeight: "100dvh" }}>
      <Header />
      <Sidebar />
      <Box sx={{ width: '100%' }}>
        <Routes>
          <Route path='/' element={<Tally />} />
          <Route path='/results' element={<Results  />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
