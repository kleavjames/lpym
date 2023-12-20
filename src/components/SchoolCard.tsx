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
  ranking: number;
  visitor: School;
  onAdd: (id: string, category: CategoryNames, count: string) => void;
  onSubtract: (id: string, category: CategoryNames, count: string) => void;
  category: CategoryNames;
};

const SchoolCard: FC<SchoolCard> = ({
  visitor,
  onAdd,
  category,
  onSubtract,
  ranking,
}) => {
  const [count, setCount] = useState("1");

  const handleNumberChange = (value: string) => {
    const result = value.replace(/\D/g, "");

    // handle change here
    setCount(result);
  };

  return (
    <Paper elevation={3}>
      <Stack direction="row" alignItems="center">
        <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ pl: 2, justifyContent: "center" }}
            color='primary'
          >
          #
        </Typography>
        <Typography
            variant="h2"
            fontWeight="bold"
            sx={{ alignItems: "center", justifyContent: "center" }}
            color='primary'
          >
          {ranking + 1}
        </Typography>
        <Box sx={{ flex: 1, p: 2 }}>
          <Typography variant="h5" sx={{ pb: 1, fontWeight: "bold" }}>
            {visitor.name}
          </Typography>
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
                    onAdd(visitor.nickName, category, count);
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
                    onSubtract(visitor.nickName, category, count);
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
  );
};

export default SchoolCard;
