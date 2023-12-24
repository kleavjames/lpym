import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import { FC } from "react";
import Select from "@mui/joy/Select";
import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
import Option from "@mui/joy/Option";
import { Category } from "../../types/category";
import ModalClose from "@mui/joy/ModalClose";

type AddEditSchoolModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (type: "add" | "edit") => void;
  type: "add" | "edit";
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  categories: Category[];
  defaultValue?: string;
};

const AddEditSchoolModal: FC<AddEditSchoolModalProps> = ({
  open,
  setOpen,
  type,
  handleChange,
  handleSubmit,
  setCategories,
  categories,
  defaultValue,
}) => {
  return (
    <>
      <Modal
        open={open}
        onClose={(
          _event: React.MouseEvent<HTMLButtonElement>,
          reason: string
        ) => {
          if (reason !== "closeClick") {
            return;
          }
          setOpen(false);
          setCategories([]);
        }}
      >
        <ModalDialog>
          <ModalClose variant="outlined" />
          <DialogTitle>{type === "add" ? "Register" : "Update"}</DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            {type === "add"
              ? "Fill in the information of the school / community."
              : "Change the information of the school that needs updating."}
          </DialogContent>
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                defaultValue={defaultValue}
                name="name"
                autoFocus
                required
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Categories</FormLabel>
              <Select
                multiple
                defaultValue={categories}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", gap: "0.25rem" }}>
                    {selected.map((selectedOption, i) => (
                      <Chip
                        key={i}
                        variant="soft"
                        sx={{ bgcolor: "primary.700", color: "#fff" }}
                      >
                        {selectedOption.label}
                      </Chip>
                    ))}
                  </Box>
                )}
                sx={{
                  minWidth: "15rem",
                  mb: 1,
                }}
                slotProps={{
                  listbox: {
                    sx: {
                      width: "100%",
                    },
                  },
                }}
                onChange={(_e, newValue) =>
                  setCategories(newValue as unknown as Category[])
                }
              >
                <Option value={Category.ELEMENTARY}>Elementary</Option>
                <Option value={Category.HIGHSCHOOL}>High School</Option>
                <Option value={Category.COLLEGE}>College</Option>
                <Option value={Category.COMMUNITY}>Community</Option>
              </Select>
            </FormControl>
            <Button type="submit" onClick={() => handleSubmit(type)}>
              Submit
            </Button>
          </Stack>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default AddEditSchoolModal;
