import SchoolCard from "../components/SchoolCard"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { School } from "../types/school";

type CommunityYouthProp = {
  schools: School[]
}

const CommunityYouth: FC<CommunityYouthProp> = ({schools}) => {
  if (!schools.length) {
    return <Box>
      <Typography>No youths added yet</Typography>
    </Box>
  }

  return (
    <Stack spacing={2} sx={{ pb: 10}}>
      {schools.map(comm => (
        <Box key={comm.id}>
          <SchoolCard name={comm.name} nickName={comm.nickName} />
        </Box>
      ))}
    </Stack>
  )
}

export default CommunityYouth