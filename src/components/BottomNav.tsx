/* eslint-disable @typescript-eslint/no-explicit-any */
import StarIcon from "@mui/icons-material/Star";
import CelebrationIcon from "@mui/icons-material/Celebration";
import PersonIcon from "@mui/icons-material/Person";
import CameraIcon from "@mui/icons-material/CameraAlt";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const ButtomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        maxWidth: 693,
        margin: "auto",
        height: 73,
        pt: 1.2,
      }}
      elevation={3}
    >
      <BottomNavigation
        sx={{ py: 2 }}
        value={location.pathname}
      >
        <BottomNavigationAction
          onClick={() => navigate("/dashboard")}
          value="/dashboard"
          icon={
            <StarIcon
              sx={{ height: 19, width: 20 }}
            />
          }
        />
        <BottomNavigationAction
          onClick={() => navigate("/program")}
          value="/program"
          icon={
            <CelebrationIcon
              sx={{ height: 20.5, width: 21.55 }}
            />
          }
        />
        <BottomNavigationAction
          onClick={() => {}}
          value="/camera"
          icon={
            <CameraIcon
              sx={{ height: 18, width: 20 }}
            />
          }
        />
        <BottomNavigationAction
          onClick={() => navigate("/profile")}
          value="/profile"
          icon={
            <PersonIcon
              sx={{ height: 16, width: 16 }}
            />
          }
        />
      </BottomNavigation>
    </Paper>
  );
}

export default ButtomNav;