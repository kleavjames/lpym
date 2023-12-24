import Sheet from '@mui/joy/Sheet/Sheet';
import Table from '@mui/joy/Table';
import { School } from '../types/school';
import { FC } from 'react';

type SchoolTableProps = {
  schools: School[];
  category: 'Elementary' | 'High School' | 'College' | 'Communities'
}

const SchoolTable: FC<SchoolTableProps> = ({schools, category = 'Elementary'}) => {
  return (
    <Sheet variant='outlined' sx={{ width: '100%', borderRadius: 'sm' }}>
      <Table size='lg' sx={{ '& tr > *:not(:first-child)': { textAlign: 'right' } }}>
        <thead>
          <tr>
            <th style={{ width: '60%' }}>{category}</th>
            <th>Visitors</th>
          </tr>
        </thead>
        <tbody>
          {schools.map(school => (
            <tr>
              <td>{school.name}</td>
              <td>{school.visitors}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
}

export default SchoolTable