import SchoolCard from "../components/SchoolCard"
import Stack from "@mui/material/Stack"
import { useSchool } from "../hooks/useSchool"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const SeniorHigh = () => {
  const {seniorHighSchools} = useSchool();

  if (!seniorHighSchools.length) {
    return <Box>
      <Typography>No schools added for Senior High</Typography>
    </Box>
  }

  return (
    <Stack spacing={2}>
      {seniorHighSchools.map(seniorHs => (
        <Box key={seniorHs.id}>
          <SchoolCard name={seniorHs.name} nickName={seniorHs.nickName} />
        </Box>
      ))}
    </Stack>
  )
}

export default SeniorHigh