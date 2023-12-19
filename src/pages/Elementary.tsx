import SchoolCard from "../components/SchoolCard"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { School } from "../types/school";
import { FC } from "react";

type ElementaryProp = {
  schools: School[]
}

const Elementary: FC<ElementaryProp> = ({schools}) => {
  if (!schools.length) {
    return <Box>
      <Typography>No schools added for elementary</Typography>
    </Box>
  }

  return (
    <Stack spacing={2} sx={{ pb: 10}}>
      {schools.map(elem => (
        <Box key={elem.id}>
          <SchoolCard name={elem.name} nickName={elem.nickName} />
        </Box>
      ))}
    </Stack>
  )
}

export default Elementary