import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { School } from "../types/school";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";

export const loadSchoolsThunk = createAsyncThunk<
  School[],
  undefined,
  {state: RootState}
>('schools/loadSchoolsThunk', async () => {
  const schools: School[] = [];
  const docRef = collection(db, "schools");
  const schoolSnapshot = await getDocs(docRef);

  schoolSnapshot.forEach(school => {
    schools.push(school.data() as School);
  })

  return schools;
});