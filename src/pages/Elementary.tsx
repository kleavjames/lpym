import SchoolCard from "../components/SchoolCard"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { CategoryNames } from "../types/category";
import { useDispatch } from "react-redux";
import { addVisitor, subtractVisitor } from "../redux/schoolSlice";
import { useAppSelector } from "../redux/store";
import { selectElementary } from "../redux/schoolSelectors";

const Elementary: FC = () => {
  const dispatch = useDispatch();
  const schools = useAppSelector(selectElementary);

  const onAddChange = (id: string, category: CategoryNames, count: number) => {
    dispatch(addVisitor({ id, category, count }));
  };

  const onSubtractChange = (
    id: string,
    category: CategoryNames,
    count: number
  ) => {
    dispatch(subtractVisitor({ id, category, count }));
  };

  if (!schools.length) {
    return <Box>
      <Typography>No schools added for elementary</Typography>
    </Box>
  }

  return (
    <Stack spacing={2} sx={{ pb: 10}}>
      {schools.map(elem => (
        <Box key={elem.id}>
          <SchoolCard
            visitor={elem}
            onAdd={onAddChange}
            category={CategoryNames.ELEMENTARY}
            onSubtract={onSubtractChange}
          />
        </Box>
      ))}
    </Stack>
  )
}

export default Elementary