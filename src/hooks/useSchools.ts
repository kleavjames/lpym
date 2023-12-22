import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { format } from "date-fns/format";
import { db, collection, doc, setDoc, getDoc } from "../services/firebase";
import { useCallback, useMemo } from "react";
import { Category, CategoryNames } from "../types/category";
import { School } from "../types/school";

const dateFormatted = format(new Date(), "mmm-dd-yyyy");

export const useSchools = () => {
  const [schools] = useCollectionData(collection(db, "schools"), {
    snapshotListenOptions: {
      includeMetadataChanges: true
    }
  });

  const [visitors] = useDocumentData(doc(db, `visitors/${dateFormatted}`), {
    snapshotListenOptions: {
      includeMetadataChanges: true
    }
  });

  const elementary = useMemo(() => {
    const newSchools = (schools || []).map((school) => {
      return {
        ...school,
        visitors: visitors?.[school.nickName]?.[CategoryNames.ELEMENTARY] ?? 0,
      };
    });
    const filteredSchools = (newSchools as School[]).filter((school) =>
      school.categories.includes(Category.ELEMENTARY)
    );
    return filteredSchools.sort((a, b) => b.visitors! - a.visitors!);
  }, [schools, visitors])

  const juniorHighs = useMemo(() => {
    const newSchools = (schools || []).map((school) => {
      return {
        ...school,
        visitors: visitors?.[school.nickName]?.[CategoryNames.JUNIORHIGH] ?? 0,
      };
    });
    const filteredSchools = (newSchools as School[]).filter((school) =>
      school.categories.includes(Category.JUNIORHIGH)
    );
    return filteredSchools.sort((a, b) => b.visitors! - a.visitors!);
  }, [schools, visitors])

  const seniorHighs = useMemo(() => {
    const newSchools = (schools || []).map((school) => {
      return {
        ...school,
        visitors: visitors?.[school.nickName]?.[CategoryNames.SENIORHIGH] ?? 0,
      };
    });
    const filteredSchools = (newSchools as School[]).filter((school) =>
      school.categories.includes(Category.SENIORHIGH)
    );
    return filteredSchools.sort((a, b) => b.visitors! - a.visitors!);
  }, [schools, visitors])

  const colleges = useMemo(() => {
    const newSchools = (schools || []).map((school) => {
      return {
        ...school,
        visitors: visitors?.[school.nickName]?.[CategoryNames.COLLEGE] ?? 0,
      };
    });
    const filteredSchools = (newSchools as School[]).filter((school) =>
      school.categories.includes(Category.COLLEGE)
    );
    return filteredSchools.sort((a, b) => b.visitors! - a.visitors!);
  }, [schools, visitors])

  const communities = useMemo(() => {
    const newSchools = (schools || []).map((school) => {
      return {
        ...school,
        visitors: visitors?.[school.nickName]?.[CategoryNames.COMMUNITY] ?? 0,
      };
    });
    const filteredSchools = (newSchools as School[]).filter((school) =>
      school.categories.includes(Category.COMMUNITY)
    );
    return filteredSchools.sort((a, b) => b.visitors! - a.visitors!);
  }, [schools, visitors])

  const addVisitor = useCallback(async (id: string, category: CategoryNames, count: number) => {
    const docRef = collection(db, "visitors");
    const schoolRef = doc(docRef, dateFormatted);
    const schoolDocRef = await getDoc(schoolRef);
    const school = schoolDocRef.data()?.[id]

    if (school?.[category]) {
      const newCount = school[category] + count;
      await setDoc(doc(docRef, dateFormatted), {
        [id]: {
          [category]: newCount
        }
      }, {merge: true});
      return;
    }

    await setDoc(doc(docRef, dateFormatted), {
      [id]: {
        [category]: count
      }
    }, {merge: true});
  }, [dateFormatted])

  const subtractVisitor = useCallback(async (id: string, category: CategoryNames, count: number) => {
    const docRef = collection(db, "visitors");
    const schoolRef = doc(docRef, dateFormatted);
    const schoolDocRef = await getDoc(schoolRef);
    const school = schoolDocRef.data()?.[id]

    if (school?.[category]) {
      const newCount = school[category] - count;
      await setDoc(doc(docRef, dateFormatted), {
        [id]: {
          [category]: newCount
        }
      }, {merge: true});
      return;
    }

    await setDoc(doc(docRef, dateFormatted), {
      [id]: {
        [category]: count
      }
    }, {merge: true});
  }, [dateFormatted])

  return {
    elementary,
    juniorHighs,
    seniorHighs,
    colleges,
    communities,
    addVisitor,
    subtractVisitor,
  }
}