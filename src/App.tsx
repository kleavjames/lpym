import Box from "@mui/joy/Box";
import Tally from "./pages/Tally";
import { Route, Routes } from "react-router-dom";
import Results from "./pages/Results";
import Login from "./pages/Login";
// import Header from "./components/Header";
// import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100dvh" }}>
      {/* <Header />
      <Sidebar /> */}
      <Box sx={{ width: "100%" }}>
        <Routes>
          <Route
            path="/"
            element={<Login />}
          />
          <Route
            path="/tally"
            element={<Tally />}
          />
          <Route
            path="/results"
            element={<Results />}
          />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
