import SchoolCard from "../components/SchoolCard"
import Stack from "@mui/material/Stack"
import { useSchool } from "../hooks/useSchool"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const JuniorHigh = () => {
  const {elementary} = useSchool();

  if (!elementary.length) {
    return <Box>
      <Typography>No schools added for elementary</Typography>
    </Box>
  }

  return (
    <Stack spacing={2}>
      {elementary.map(elem => (
        <Box key={elem.id}>
          <SchoolCard name={elem.name} nickName={elem.nickName} />
        </Box>
      ))}
    </Stack>
  )
}

export default JuniorHigh