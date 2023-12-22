import { Route, Routes, useNavigate } from "react-router-dom";
import { ProtectedRoute } from "./hoc/ProtectedRoutes";
import { useEffect } from "react";
import Elementary from "./pages/Elementary";
import SeniorHigh from "./pages/SeniorHigh";
import College from "./pages/College";
import CommunityYouth from "./pages/CommunityYouth";
import Login from "./pages/Login";
import Box from "@mui/material/Box";
import JuniorHigh from "./pages/JuniorHigh";
import { useSchools } from "./hooks/useSchools";
import Results from "./pages/Results";

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
    visitorsCount,
  } = useSchools();
  const navigate = useNavigate();
  const user = false;
  // const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      navigate("/elementary", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Box>
      {/* <TopBar addSchool={addSchool} /> */}
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
        <Route
          path="/results"
          element={
            <ProtectedRoute>
              <Results
                visitorsCount={visitorsCount}
                elementary={elementary}
                juniorHighs={juniorHighs}
                seniorHighs={seniorHighs}
                colleges={colleges}
                communities={communities}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
      {/* <ButtomNav /> */}
    </Box>
  );
};

export default App;
