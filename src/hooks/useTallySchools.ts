import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { db, collection, doc, setDoc, getDoc } from "../services/firebase";
import { useCallback, useMemo, useState } from "react";
import { School } from "../types/school";
import { Category, CategoryNames } from "../types/category";
import { useAuth } from "./useAuth";

export const useTallySchools = () => {
  const {dateLoggedIn} = useAuth();
  const [category, setCategory] = useState(Category.HIGHSCHOOL)

  const [schools] = useCollectionData(collection(db, "schools"), {
    snapshotListenOptions: {
      includeMetadataChanges: true
    }
  });

  const [visitors] = useDocumentData(doc(db, `visitors/${dateLoggedIn}`), {
    snapshotListenOptions: {
      includeMetadataChanges: true
    }
  });

  const formattedSchools = useMemo(() => {
    let categoryName = CategoryNames.HIGHSCHOOL;

    if (category === Category.ELEMENTARY) categoryName = CategoryNames.ELEMENTARY;
    if (category === Category.HIGHSCHOOL) categoryName = CategoryNames.HIGHSCHOOL;
    if (category === Category.COLLEGE) categoryName = CategoryNames.COLLEGE;
    if (category === Category.COMMUNITY) categoryName = CategoryNames.COMMUNITY;

    const filteredSchools = (schools || []).filter((school) =>
      school.categories.includes(category)
    );
    const newSchools = filteredSchools.map((school) => {
      return {
        ...school,
        visitors: visitors?.[school.uid]?.[categoryName] ?? 0,
      };
    });
    return newSchools.sort((a, b) => b.visitors! - a.visitors!) as School[];
  }, [category, schools, visitors])

  const addSchool = useCallback(async (school: School) => {
    const docRef = collection(db, "schools");
    await setDoc(doc(docRef, school.uid), {
      uid: school.uid,
      name: school.name,
      categories: school.categories
    });
  }, [])

  const addVisitor = useCallback(async (id: string, category: CategoryNames, count: number) => {
    const docRef = collection(db, "visitors");
    const schoolRef = doc(docRef, dateLoggedIn);
    const schoolDocRef = await getDoc(schoolRef);
    const school = schoolDocRef.data()?.[id]

    if (school?.[category]) {
      const newCount = school[category] + count;
      await setDoc(doc(docRef, dateLoggedIn), {
        [id]: {
          [category]: newCount
        }
      }, {merge: true});
      return;
    }

    await setDoc(doc(docRef, dateLoggedIn), {
      [id]: {
        [category]: count
      },
    }, {merge: true});
  }, [dateLoggedIn])

  const subtractVisitor = useCallback(async (id: string, category: CategoryNames, count: number) => {
    const docRef = collection(db, "visitors");
    const schoolRef = doc(docRef, dateLoggedIn);
    const schoolDocRef = await getDoc(schoolRef);
    const school = schoolDocRef.data()?.[id]

    if (school?.[category]) {
      const newCount = school[category] - count;
      await setDoc(doc(docRef, dateLoggedIn), {
        [id]: {
          [category]: newCount
        }
      }, {merge: true});
      return;
    }

    await setDoc(doc(docRef, dateLoggedIn), {
      [id]: {
        [category]: count
      }
    }, {merge: true});
  }, [dateLoggedIn])

  return {
    category,
    formattedSchools,
    setCategory,
    addSchool,
    addVisitor,
    subtractVisitor,
  }
}