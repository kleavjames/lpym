import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button"
import { useMemo } from "react";
import { useLocation } from "react-router-dom";

function TopBar() {
  const location = useLocation();

  const category = useMemo(() => {
    switch(location.pathname) {
      case '/elementary':
        return 'Elementary';
      case '/highschool':
        return 'High School';
      case '/senior':
        return 'Senior High';
      case '/college':
        return 'College';
      default:
        return 'Community';
    }
  }, [location.pathname])

  return (
    <>
      <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{pb: 2}}>
        <Typography variant="h4" fontWeight='bold' color='primary'>{category}</Typography>
        <Button size='small' variant='contained' disableElevation>Add School</Button>
      </Stack>
    </>
  )
}

export default TopBar