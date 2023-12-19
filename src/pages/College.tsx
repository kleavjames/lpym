import SchoolCard from "../components/SchoolCard"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { School } from "../types/school";

type CollegeProp = {
  schools: School[]
}

const College: FC<CollegeProp> = ({schools}) => {
  if (!schools.length) {
    return <Box>
      <Typography>No youths added yet</Typography>
    </Box>
  }

  return (
    <Stack spacing={2} sx={{ pb: 10}}>
      {schools.map(college => (
        <Box key={college.id}>
          <SchoolCard name={college.name} nickName={college.nickName} />
        </Box>
      ))}
    </Stack>
  )
}

export default College