import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Categories } from "../constants/category";
import { AddSchool } from "../types/school";
import { CategoryNames } from "../types/category";

const initState = {
  name: "",
  nickName: "",
  categories: {
    [CategoryNames.ELEMENTARY]: false,
    [CategoryNames.HIGHSCHOOL]: false,
    [CategoryNames.SENIORHIGH]: false,
    [CategoryNames.COLLEGE]: false,
    [CategoryNames.COMMUNITY]: false,
  },
};

function TopBar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [schoolToAdd, setSchoolToAdd] = useState<AddSchool>(initState);

  const category = useMemo(() => {
    switch (location.pathname) {
      case "/elementary":
        return "Elementary";
      case "/highschool":
        return "High School";
      case "/senior":
        return "Senior High";
      case "/college":
        return "College";
      default:
        return "Community";
    }
  }, [location.pathname]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log(schoolToAdd);
    setSchoolToAdd(initState);
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.type === "checkbox") {
      setSchoolToAdd({
        ...schoolToAdd,
        categories: {
          ...schoolToAdd.categories,
          [event.target.name]: event.target.checked,
        },
      });
      return;
    }

    setSchoolToAdd({
      ...schoolToAdd,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add School</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            size="small"
            id="name"
            label="School name"
            type="email"
            fullWidth
            name="name"
            variant="outlined"
            value={schoolToAdd.name}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            size="small"
            id="name"
            label="Nickname"
            name="nickName"
            type="email"
            fullWidth
            variant="outlined"
            value={schoolToAdd.nickName}
            onChange={handleChange}
          />
          <FormGroup>
            <FormControlLabel
              name={CategoryNames.ELEMENTARY}
              control={<Checkbox onChange={handleChange} />}
              label={Categories.ELEM}
            />
            <FormControlLabel
              name={CategoryNames.HIGHSCHOOL}
              control={<Checkbox onChange={handleChange} />}
              label={Categories.HS}
            />
            <FormControlLabel
              name={CategoryNames.SENIORHIGH}
              control={<Checkbox onChange={handleChange} />}
              label={Categories.SENIOR}
            />
            <FormControlLabel
              name={CategoryNames.COLLEGE}
              control={<Checkbox onChange={handleChange} />}
              label={Categories.COL}
            />
            <FormControlLabel
              name={CategoryNames.COMMUNITY}
              control={<Checkbox onChange={handleChange} />}
              label={Categories.COM}
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ pb: 2 }}
      >
        <Typography variant="h4" fontWeight="bold" color="primary">
          {category}
        </Typography>
        <Button
          size="small"
          variant="contained"
          disableElevation
          onClick={handleClickOpen}
        >
          Add School
        </Button>
      </Stack>
    </>
  );
}

export default TopBar;
