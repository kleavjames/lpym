import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { School } from "../types/school";
import { useCallback, useMemo } from "react";
import { Category } from "../types/category";

export const useSchool = () => {
  const [schools, schoolLoader, schoolError] = useCollectionData(
    collection(db, "schools"),
    {
      snapshotListenOptions: {
        includeMetadataChanges: true,
      },
    }
  );

  const elementary = useMemo(() => {
    return ((schools || []) as School[]).filter((school) =>
      school.categories.includes(Category.ELEMENTARY)
    );
  }, [schools]);

  const juniorHighSchools = useMemo(() => {
    return ((schools || []) as School[]).filter((school) =>
      school.categories.includes(Category.JUNIORHIGH)
    );
  }, [schools]);

  const seniorHighSchools = useMemo(() => {
    return ((schools || []) as School[]).filter((school) =>
      school.categories.includes(Category.SENIORHIGH)
    );
  }, [schools]);

  const colleges = useMemo(() => {
    return ((schools || []) as School[]).filter((school) =>
      school.categories.includes(Category.COLLEGE)
    );
  }, [schools]);

  const communities = useMemo(() => {
    return ((schools || []) as School[]).filter((school) =>
      school.categories.includes(Category.COMMUNITY)
    );
  }, [schools]);

  const addSchool = useCallback(async (school: School) => {
    // add school
    const schoolRef = collection(db, "schools");
    await setDoc(doc(schoolRef, school.nickName), {
      ...school,
    });
  }, []);

  return {
    schools,
    addSchool,
    schoolLoader,
    schoolError,
    juniorHighSchools,
    seniorHighSchools,
    colleges,
    communities,
    elementary,
  };
};
