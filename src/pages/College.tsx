import SchoolCard from "../components/SchoolCard";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { CategoryNames } from "../types/category";
import { addVisitor, subtractVisitor } from "../redux/schoolSlice";
import { useAppSelector } from "../redux/store";
import { selectColleges } from "../redux/schoolSelectors";

const College: FC = () => {
  const dispatch = useDispatch();
  const schools = useAppSelector(selectColleges);

  const onAddChange = (id: string, category: CategoryNames, count: string) => {
    if (count) {
      dispatch(addVisitor({ id, category, count: +count }));
    }
  };

  const onSubtractChange = (
    id: string,
    category: CategoryNames,
    count: string
  ) => {
    if (count) {
      dispatch(subtractVisitor({ id, category, count: +count }));
    }
  };

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
        <Box key={college.id}>
          <SchoolCard
            ranking={i}
            visitor={college}
            onAdd={onAddChange}
            category={CategoryNames.COLLEGE}
            onSubtract={onSubtractChange}
          />
        </Box>
      ))}
    </Stack>
  );
};

export default College;
