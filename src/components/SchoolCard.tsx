import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FC, useState } from "react";
import { School } from "../types/school";
import { CategoryNames } from "../types/category";

type SchoolCard = {
  visitor: School;
  onAdd: (id: string, category: CategoryNames, count: number) => void;
  onSubtract: (id: string, category: CategoryNames, count: number) => void;
  category: CategoryNames;
};

const SchoolCard: FC<SchoolCard> = ({ visitor, onAdd, category, onSubtract }) => {
  const [count, setCount] = useState(1);

  const handleNumberChange = (value: string) => {
    if (["e", "E", "-"].some((char) => value.includes(char))) return;

    // handle change here
    setCount(+value);
  };

  return (
    <Paper sx={{ p: 2 }} elevation={3}>
      <Box>
        <Typography variant="h4" sx={{ pb: 1, fontWeight: "bold" }}>
          {visitor.name}
        </Typography>
        <Box>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h4" sx={{ pb: 1, fontWeight: "bold" }}>
              Visitors: {visitor.visitors}
            </Typography>
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <TextField
                size="small"
                id="visitor-text-field"
                label="Visitor"
                variant="outlined"
                margin="dense"
                type="number"
                value={count}
                sx={{ width: 100 }}
                onChange={(e) => handleNumberChange(e.target.value)}
              />
              <Button
                size="small"
                variant="contained"
                disableElevation
                onClick={() => {
                  onAdd(visitor.nickName, category, count);
                  setCount(1);
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
                  onSubtract(visitor.nickName, category, count);
                  setCount(1);
                }}
              >
                Minus
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Paper>
  );
};

export default SchoolCard;
