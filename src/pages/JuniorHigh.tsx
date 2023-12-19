import SchoolCard from "../components/SchoolCard"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { School } from "../types/school";
import { FC } from "react";

type JuniorHighProp = {
  schools: School[]
}

const JuniorHigh: FC<JuniorHighProp> = ({schools}) => {
  if (!schools.length) {
    return <Box>
      <Typography>No schools added for Junior High</Typography>
    </Box>
  }

  return (
    <Stack spacing={2} sx={{ pb: 10}}>
      {schools.map(juniorHs => (
        <Box key={juniorHs.id}>
          <SchoolCard name={juniorHs.name} nickName={juniorHs.nickName} />
        </Box>
      ))}
    </Stack>
  )
}

export default JuniorHigh