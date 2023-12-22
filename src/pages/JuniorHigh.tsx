import SchoolCard from "../components/SchoolCard"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { CategoryNames } from "../types/category";
import { School } from "../types/school";

type Props = {
  schools: School[];
  addVisitor: (id: string, category: CategoryNames, count: number) => void;
  subtractVisitor: (id: string, category: CategoryNames, count: number) => void;
  addSchool: (data: School) => void;
}

const JuniorHigh: FC<Props> = ({schools, addVisitor, subtractVisitor}) => {
  const onAddChange = (id: string, category: CategoryNames, count: string) => {
    if (count) {
      addVisitor(id, category, +count);
    }
  };

  const onSubtractChange = (
    id: string,
    category: CategoryNames,
    count: string
  ) => {
    if (count) {
      subtractVisitor(id, category, +count);
    }
  };

  if (!schools.length) {
    return <Box>
      <Typography>No schools added for Junior High</Typography>
    </Box>
  }

  return (
    <Stack spacing={2} sx={{ pb: 10}}>
      {schools.map((juniorHs, i) => (
        <Box key={juniorHs.uid}>
          <SchoolCard
            ranking={i}
            visitor={juniorHs}
            onAdd={onAddChange}
            category={CategoryNames.JUNIORHIGH}
            onSubtract={onSubtractChange}
          />
        </Box>
      ))}
    </Stack>
  )
}

export default JuniorHigh