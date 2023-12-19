import SchoolCard from "../components/SchoolCard"
import Stack from "@mui/material/Stack"
import { useSchool } from "../hooks/useSchool"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const JuniorHigh = () => {
  const {juniorHighSchools} = useSchool();

  if (!juniorHighSchools.length) {
    return <Box>
      <Typography>No schools added for Junior High</Typography>
    </Box>
  }

  return (
    <Stack spacing={2}>
      {juniorHighSchools.map(juniorHs => (
        <Box key={juniorHs.id}>
          <SchoolCard name={juniorHs.name} nickName={juniorHs.nickName} />
        </Box>
      ))}
    </Stack>
  )
}

export default JuniorHigh