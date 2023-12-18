import { Route, Routes, useNavigate } from "react-router-dom";
import ButtomNav from "./components/BottomNav";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { ProtectedRoute } from "./hoc/ProtectedRoutes";
import { useEffect } from "react";

const App = () => {
  const navigate = useNavigate();
  const user = undefined;
  // const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/program"
          element={
            <ProtectedRoute>
              <Program />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/camera"
          element={
            <ProtectedRoute>
              <CameraComponent />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
      <ButtomNav />
    </>
  );
}

export default App;
