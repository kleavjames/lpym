/* eslint-disable @typescript-eslint/no-explicit-any */
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Categories } from "../constants/category";

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
        margin: "auto",
        height: 73,
        pt: 1.2,
      }}
      elevation={3}
    >
      <BottomNavigation
        sx={{ py: 2 }}
        showLabels
        value={location.pathname}
      >
        <BottomNavigationAction
          onClick={() => navigate("/elementary")}
          value="/elementary"
          label={Categories.ELEM}
        />
        <BottomNavigationAction
          onClick={() => navigate("/junior")}
          value="/highschool"
          label={Categories.JUNIOR}
        />
        <BottomNavigationAction
          onClick={() => navigate("/senior")}
          value="/senior"
          label={Categories.SENIOR}
        />
        <BottomNavigationAction
          onClick={() => navigate("/college")}
          value="/college"
          label={Categories.COL}
        />
        <BottomNavigationAction
          onClick={() => navigate("/community")}
          value="/community"
          label={Categories.COM}
        />
      </BottomNavigation>
    </Paper>
  );
}

export default ButtomNav;