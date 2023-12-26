import Box from "@mui/joy/Box";
import Tally from "./pages/Tally";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Results from "./pages/Results";
import Login from "./pages/Login";
import { useAuth } from "./hooks/useAuth";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Maintenance from "./pages/Maintenance";
import { useFirebase } from "./hooks/useFirebase";
import Accounts from "./pages/Accounts";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};

const App = () => {
  const { user } = useAuth();
  const { flags } = useFirebase();

  if (flags.underMaintenance) {
    return (
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Box sx={{ width: "100%" }}>
          <Routes>
            <Route path="/" element={<Maintenance />} />
          </Routes>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100dvh" }}>
      {user && (
        <>
          <Header />
          <Sidebar />
        </>
      )}
      <Box sx={{ width: "100%" }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/tally"
            element={
              <ProtectedRoute>
                <Tally />
              </ProtectedRoute>
            }
          />
          <Route
            path="/results"
            element={
              <ProtectedRoute>
                <Results />
              </ProtectedRoute>
            }
          />
          <Route
            path="/accounts"
            element={
              <ProtectedRoute>
                <Accounts />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
