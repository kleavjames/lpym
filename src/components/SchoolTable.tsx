import Sheet from '@mui/joy/Sheet/Sheet';
import Table from '@mui/joy/Table';

const SchoolTable = () => {
  return (
    <Sheet variant='outlined' sx={{ width: '100%', borderRadius: 'sm' }}>
      <Table size='lg' sx={{ '& tr > *:not(:first-child)': { textAlign: 'right' } }}>
        <thead>
          <tr>
            <th style={{ width: '60%' }}>Elementary</th>
            <th>Visitors</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>University of SouthEastern Philippines</td>
            <td style={{ color: '#12467B', fontWeight: 'bold' }}>6</td>
          </tr>
          <tr>
            <td>Ateneo De Davao University</td>
            <td style={{ color: '#12467B', fontWeight: 'bold' }}>9</td>
          </tr>
          <tr>
            <td>Communal Elementary School</td>
            <td style={{ color: '#12467B', fontWeight: 'bold' }}>16</td>
          </tr>
        </tbody>
      </Table>
    </Sheet>
  );
}

export default SchoolTable