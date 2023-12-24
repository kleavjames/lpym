import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import Grid from "@mui/joy/Grid";
import { useDebouncedCallback } from "use-debounce";
import { useCallback, useMemo, useRef, useState } from "react";
import { useTallySchools } from "../hooks/useTallySchools";
import { processString } from "../utils/strings";
import TallyCard from "../components/TallyCard";
import Search from "../components/Search";
import SelectCategory from "../components/SelectCategory";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import AddEditSchoolModal from "../components/modals/AddEditSchoolModal";
import { Category } from "../types/category";
import { nanoid } from "nanoid";
import { School } from "../types/school";

const Tally = () => {
  const { formattedSchools, setCategory, addSchool,  } = useTallySchools();

  const [searchValue, setSearchValue] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const nameRef = useRef('');
  const uidSchoolRef = useRef('');

  const searchedSchools = useMemo(() => {
    if (searchValue === "") return formattedSchools;
    return formattedSchools.filter((school) =>
      processString(school.name).includes(processString(searchValue))
    );
  }, [formattedSchools, searchValue]);

  const debounced = useDebouncedCallback(
    useCallback((value) => {
      setSearchValue(value);
    }, []),
    700
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    nameRef.current = event.target.value;
  };

  const handleSubmit = useCallback(async (type: 'add' | 'edit') => {
    if (type === 'add') {
      await addSchool({
        uid: nanoid(),
        name: nameRef.current,
        categories
      })
      setOpenAddModal(false);
    } else {
      await addSchool({
        uid: uidSchoolRef.current,
        name: nameRef.current,
        categories
      })
      setOpenEditModal(false);
    }
    nameRef.current = '';
    uidSchoolRef.current = '';
  }, [addSchool, categories])

  const onHandleEditSchool = useCallback((school: School) => {
    nameRef.current = school.name;
    uidSchoolRef.current = school.uid;
    setCategories(school.categories)
    setOpenEditModal(true);
  }, [])

  const renderSchoolCards = useCallback(() => {
    return searchedSchools.map((school, i) => (
      <Grid key={school.uid} xs={12} sm={6} lg={4}>
        <TallyCard key={school.uid} school={school} ranking={i} onHandlePress={() => onHandleEditSchool(school)} />
      </Grid>
    ));
  }, [onHandleEditSchool, searchedSchools]);

  return (
    <>
      <AddEditSchoolModal
        open={openAddModal}
        categories={categories}
        setOpen={setOpenAddModal}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        type="add"
        setCategories={setCategories}
      />
      <AddEditSchoolModal
        open={openEditModal}
        categories={categories}
        defaultValue={nameRef.current}
        setOpen={setOpenEditModal}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        type="edit"
        setCategories={setCategories}
      />
      <Grid
        container
        sx={{ flexGrow: 1, m: 1, mt: { xs: 7, md: 0 } }}
        spacing={2}
      >
        <Grid xs={12}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography level="h1" sx={{ pb: 1, color: "primary.700" }}>
              Tally
            </Typography>
            <Button
              variant="solid"
              sx={{ bgcolor: "success.700", px: 5 }}
              onClick={() => setOpenAddModal(true)}
            >
              Register
            </Button>
          </Stack>
          <Divider sx={{ mb: 2 }} />
        </Grid>
        <Grid xs={12} sm={6}>
          <Search debounced={debounced} />
        </Grid>
        <Grid xs={12} sm={6} sx={{ mb: 2 }}>
          <SelectCategory setCategory={setCategory} />
        </Grid>
        {searchedSchools.length ? (
          renderSchoolCards()
        ) : (
          <Grid xs={12}>
            <Typography
              sx={{
                textAlign: "center",
                color: "primary.plainDisabledColor",
                mt: 2,
              }}
            >
              No school or community found
            </Typography>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Tally;
