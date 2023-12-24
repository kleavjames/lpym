import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { Category } from '../types/category';
import { Dispatch, FC, SetStateAction } from 'react';

type SelectCategoryProps = {
  setCategory: Dispatch<SetStateAction<Category>>
}

const SelectCategory: FC<SelectCategoryProps> = ({setCategory}) => {
  return (
    <FormControl>
      <FormLabel id="select-field-demo-label" htmlFor="select-field-demo-button">
        Category
      </FormLabel>
      <Select
        defaultValue={Category.HIGHSCHOOL}
        slotProps={{
          button: {
            id: 'select-field-demo-button',
            'aria-labelledby': 'select-field-demo-label select-field-demo-button',
          },
        }}
        onChange={(_e, newValue) => setCategory(newValue!)}
      >
        <Option value={Category.ELEMENTARY}>Elementary</Option>
        <Option value={Category.HIGHSCHOOL}>High School</Option>
        <Option value={Category.COLLEGE}>College</Option>
        <Option value={Category.COMMUNITY}>Community</Option>
      </Select>
    </FormControl>
  );
}

export default SelectCategory