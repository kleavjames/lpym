import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FC } from 'react';

type SchoolCard = {
  name: string;
  nickName: string;
}

const SchoolCard: FC<SchoolCard> = ({name}) => {
  return (
    <Paper sx={{ p: 2}} elevation={3}>
      <Box>
        <Typography variant='h4' sx={{ pb: 1, fontWeight: 'bold'}}>{name}</Typography>
        <Box>
          <Stack direction="row" spacing={1} alignItems='center' justifyContent='space-between'>
            <Typography variant='h4' sx={{ pb: 1, fontWeight: 'bold'}}>Visitors: 1</Typography>
            <Stack direction='row' spacing={1} justifyContent='flex-end'>
              <TextField size='small' id="visitor-text-field" label="Visitor" variant="outlined" margin='dense' sx={{width: 100}} />
              <Button size='small' variant='contained' disableElevation>Add</Button>
              <Button size='small' variant='contained' disableElevation  color='error'>Remove</Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Paper>
  )
}

export default SchoolCard