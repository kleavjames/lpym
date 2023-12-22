import SchoolCard from "../components/SchoolCard";
import Stack from "@mui/material/Stack";
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

const College: FC<Props> = ({ schools, addVisitor, subtractVisitor, addSchool }) => {
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

  const onUpdateSchool = async (school: School) => {
    await addSchool(school)
  }

  if (!schools.length) {
    return (
      <Box>
        <Typography>No youths added yet</Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={2} sx={{ pb: 10 }}>
      {schools.map((college, i) => (
        <Box key={college.uid}>
          <SchoolCard
            ranking={i}
            visitor={college}
            onAdd={onAddChange}
            category={CategoryNames.COLLEGE}
            onSubtract={onSubtractChange}
            onUpdateSchool={onUpdateSchool}
          />
        </Box>
      ))}
    </Stack>
  );
};

export default College;
