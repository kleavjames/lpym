import { Route, Routes, useNavigate } from "react-router-dom";
import { ProtectedRoute } from "./hoc/ProtectedRoutes";
import { useEffect } from "react";
import ButtomNav from "./components/BottomNav";
import Elementary from "./pages/Elementary";
import SeniorHigh from "./pages/SeniorHigh";
import College from "./pages/College";
import CommunityYouth from "./pages/CommunityYouth";
import Login from "./pages/Login";
import TopBar from "./components/TopBar";
import Box from "@mui/material/Box";
import JuniorHigh from "./pages/JuniorHigh";
import { useAppDispatch } from "./redux/store";
import { loadSchoolsThunk } from "./redux/schoolThunks";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = true;
  // const [user] = useAuthState(auth);

  useEffect(() => {
    dispatch(loadSchoolsThunk());
  }, [dispatch])

  useEffect(() => {
    if (user) {
      navigate("/elementary", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Box sx={{p: 3}}>
      <TopBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/elementary"
          element={
            <ProtectedRoute>
              <Elementary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/junior"
          element={
            <ProtectedRoute>
              <JuniorHigh />
            </ProtectedRoute>
          }
        />
        <Route
          path="/senior"
          element={
            <ProtectedRoute>
              <SeniorHigh />
            </ProtectedRoute>
          }
        />
        <Route
          path="/college"
          element={
            <ProtectedRoute>
              <College />
            </ProtectedRoute>
          }
        />
        <Route
          path="/community"
          element={
            <ProtectedRoute>
              <CommunityYouth />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ButtomNav />
    </Box>
  );
}

export default App;
