import SchoolCard from "../components/SchoolCard"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { School } from "../types/school";
import { FC } from "react";

type SeniorHighProp = {
  schools: School[]
}

const SeniorHigh: FC<SeniorHighProp> = ({schools}) => {
  if (!schools.length) {
    return <Box>
      <Typography>No schools added for Senior High</Typography>
    </Box>
  }

  return (
    <Stack spacing={2} sx={{ pb: 10}}>
      {schools.map(seniorHs => (
        <Box key={seniorHs.id}>
          <SchoolCard name={seniorHs.name} nickName={seniorHs.nickName} />
        </Box>
      ))}
    </Stack>
  )
}

export default SeniorHigh