import SchoolCard from "../components/SchoolCard"
import Stack from "@mui/material/Stack"

const Elementary = () => {
  return (
    <Stack spacing={2}>
      <SchoolCard />
      <SchoolCard />
      <SchoolCard />
    </Stack>
  )
}

export default Elementary