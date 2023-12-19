import SchoolCard from "../components/SchoolCard"
import Stack from "@mui/material/Stack"
import { useSchool } from "../hooks/useSchool"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const CommunityYouth = () => {
  const {communities} = useSchool();

  if (!communities.length) {
    return <Box>
      <Typography>No youths added yet</Typography>
    </Box>
  }

  return (
    <Stack spacing={2}>
      {communities.map(comm => (
        <Box key={comm.id}>
          <SchoolCard name={comm.name} nickName={comm.nickName} />
        </Box>
      ))}
    </Stack>
  )
}

export default CommunityYouth