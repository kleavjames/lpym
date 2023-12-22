import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FC, useState } from "react";
import { AddSchool, School } from "../types/school";
import { Category, CategoryNames } from "../types/category";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import DialogActions from "@mui/material/DialogActions";
import { Categories } from "../constants/category";

type SchoolCard = {
  ranking: number;
  visitor: School;
  onAdd: (id: string, category: CategoryNames, count: string) => void;
  onSubtract: (id: string, category: CategoryNames, count: string) => void;
  category: CategoryNames;
  onUpdateSchool: (data: School) => void;
};

const SchoolCard: FC<SchoolCard> = ({
  visitor,
  onAdd,
  category,
  onSubtract,
  ranking,
  onUpdateSchool,
}) => {
  const [open, setOpen] = useState(false)
  const [schoolToAdd, setSchoolToAdd] = useState<AddSchool>({
    name: visitor.name,
    categories: {
      [CategoryNames.ELEMENTARY]: visitor.categories.includes(Category.ELEMENTARY),
      [CategoryNames.JUNIORHIGH]: visitor.categories.includes(Category.JUNIORHIGH),
      [CategoryNames.SENIORHIGH]: visitor.categories.includes(Category.SENIORHIGH),
      [CategoryNames.COLLEGE]: visitor.categories.includes(Category.COLLEGE),
      [CategoryNames.COMMUNITY]: visitor.categories.includes(Category.COMMUNITY),
    }
  });
  const [count, setCount] = useState("1");

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

  const onHandleAddSchool = async () => {
    const categorySchool = [];
    const {name, categories} = schoolToAdd;

    if (categories.elementary) categorySchool.push(Category.ELEMENTARY)
    if (categories.juniorhigh) categorySchool.push(Category.JUNIORHIGH)
    if (categories.seniorhigh) categorySchool.push(Category.SENIORHIGH)
    if (categories.college) categorySchool.push(Category.COLLEGE)
    if (categories.community) categorySchool.push(Category.COMMUNITY)

    await onUpdateSchool({
      ...visitor,
      name,
      categories: categorySchool
    })

    handleClose();
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleNumberChange = (value: string) => {
    const result = value.replace(/\D/g, "");

    // handle change here
    setCount(result);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
          <DialogTitle>Update School / Community</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              size="small"
              id="name"
              label="School name / Company / Community"
              type="email"
              fullWidth
              name="name"
              variant="outlined"
              value={schoolToAdd.name}
              onChange={handleChange}
            />
            <FormGroup>
              <FormControlLabel
                checked={schoolToAdd.categories.elementary}
                name={CategoryNames.ELEMENTARY}
                control={<Checkbox onChange={handleChange} />}
                label={Categories.ELEM}
              />
              <FormControlLabel
                checked={schoolToAdd.categories.juniorhigh}
                name={CategoryNames.JUNIORHIGH}
                control={<Checkbox onChange={handleChange} />}
                label={Categories.JUNIOR}
              />
              <FormControlLabel
                checked={schoolToAdd.categories.seniorhigh}
                name={CategoryNames.SENIORHIGH}
                control={<Checkbox onChange={handleChange} />}
                label={Categories.SENIOR}
              />
              <FormControlLabel
                checked={schoolToAdd.categories.college}
                name={CategoryNames.COLLEGE}
                control={<Checkbox onChange={handleChange} />}
                label={Categories.COL}
              />
              <FormControlLabel
                checked={schoolToAdd.categories.community}
                name={CategoryNames.COMMUNITY}
                control={<Checkbox onChange={handleChange} />}
                label={Categories.COM}
              />
            </FormGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={onHandleAddSchool}>Update</Button>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
    <Paper elevation={3}>
      <Stack direction="row" alignItems="center">
        {visitor.visitors! > 0 ? (
          <>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ pl: 2, justifyContent: "center" }}
              color="primary"
            >
              #
            </Typography>
            <Typography
              variant="h2"
              fontWeight="bold"
              sx={{ alignItems: "center", justifyContent: "center" }}
              color="primary"
            >
              {ranking + 1}
            </Typography>
          </>
        ) : null}
        <Box sx={{ flex: 1, p: 2 }}>
          <Stack direction='row' alignItems='center'>
            <Typography variant="h5" sx={{ pb: 1, fontWeight: "bold" }}>
              {visitor.name}
            </Typography>
            <IconButton sx={{ pl: 2, position: 'relative', bottom: 3}} onClick={() => setOpen(true)}>
              <EditIcon />
            </IconButton>
          </Stack>
          <Box>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h6" sx={{ pb: 1, fontWeight: "bold" }}>
                Visitors: {visitor.visitors}
              </Typography>
              <Stack direction="row" spacing={1} justifyContent="flex-end">
                <TextField
                  size="small"
                  id="visitor-text-field"
                  label="Visitor"
                  variant="outlined"
                  margin="dense"
                  value={count}
                  type="text"
                  sx={{ width: 100 }}
                  onChange={(e) => handleNumberChange(e.target.value)}
                />
                <Button
                  size="small"
                  variant="contained"
                  disableElevation
                  onClick={() => {
                    onAdd(visitor.uid, category, count);
                    setCount("1");
                  }}
                >
                  Add
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  disableElevation
                  color="error"
                  onClick={() => {
                    onSubtract(visitor.uid, category, count);
                    setCount("1");
                  }}
                >
                  Minus
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Paper>
    </>
  );
};

export default SchoolCard;
