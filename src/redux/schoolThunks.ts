import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { School } from "../types/school";
import { db } from "../services/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

export const loadSchoolsThunk = createAsyncThunk<
  School[],
  void,
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

export const addSchoolThunk = createAsyncThunk<
  School,
  School,
  {state: RootState}
>('schools/addSchoolThunk', async (school) => {
  try {
    const schoolRef = collection(db, "schools");
    await setDoc(doc(schoolRef, school.nickName), {
      ...school,
    });

    return school;
  } catch (error) {
    alert('Error on adding the new school');
    throw new Error('Error on adding the new school')
  }
});