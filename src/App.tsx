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
import { useSchools } from "./hooks/useSchools";

const App = () => {
  const {
    elementary,
    juniorHighs,
    seniorHighs,
    colleges,
    communities,
    addVisitor,
    subtractVisitor,
    addSchool,
  } = useSchools();
  const navigate = useNavigate();
  const user = true;
  // const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      navigate("/elementary", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Box sx={{ p: 3 }}>
      <TopBar addSchool={addSchool} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/elementary"
          element={
            <ProtectedRoute>
              <Elementary
                schools={elementary}
                addVisitor={addVisitor}
                subtractVisitor={subtractVisitor}
                updateSchool={addSchool}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/junior"
          element={
            <ProtectedRoute>
              <JuniorHigh
                schools={juniorHighs}
                addVisitor={addVisitor}
                subtractVisitor={subtractVisitor}
                updateSchool={addSchool}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/senior"
          element={
            <ProtectedRoute>
              <SeniorHigh
                schools={seniorHighs}
                addVisitor={addVisitor}
                subtractVisitor={subtractVisitor}
                updateSchool={addSchool}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/college"
          element={
            <ProtectedRoute>
              <College
                schools={colleges}
                addVisitor={addVisitor}
                subtractVisitor={subtractVisitor}
                updateSchool={addSchool}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/community"
          element={
            <ProtectedRoute>
              <CommunityYouth
                schools={communities}
                addVisitor={addVisitor}
                subtractVisitor={subtractVisitor}
                updateSchool={addSchool}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ButtomNav />
    </Box>
  );
};

export default App;
