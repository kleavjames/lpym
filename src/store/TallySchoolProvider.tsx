import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";
import { School } from "../types/school";
import { collection, db, doc, getDoc, setDoc } from "../services/firebase";
import { Category, CategoryNames } from "../types/category";
import { useFirebase } from "../hooks/useFirebase";
import { format } from "date-fns/format";

type Props = {
  children: ReactNode;
};

type Context = {
  category: Category;
  setCategory: React.Dispatch<React.SetStateAction<Category>>;
  formattedSchools: School[];
  addSchool: (school: School) => void;
  addVisitor: (id: string, category: CategoryNames, count: number) => void;
  subtractVisitor: (id: string, category: CategoryNames, count: number) => void;
};

const dateFormatted = format(new Date(), "MMM-dd-yyyy");

const TallySchoolContext = createContext<Context>({
  category: Category.HIGHSCHOOL,
  setCategory: () => {},
  formattedSchools: [],
  addSchool: () => {},
  addVisitor: () => {},
  subtractVisitor: () => {},
});

const TallySchoolProvider: FC<Props> = ({ children }) => {
  const { schools, visitors } = useFirebase();

  const [category, setCategory] = useState(Category.HIGHSCHOOL);

  const formattedSchools = useMemo(() => {
    let categoryName = CategoryNames.HIGHSCHOOL;

    if (category === Category.ELEMENTARY)
      categoryName = CategoryNames.ELEMENTARY;
    if (category === Category.HIGHSCHOOL)
      categoryName = CategoryNames.HIGHSCHOOL;
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
  }, [category, schools, visitors]);

  const addSchool = useCallback(async (school: School) => {
    const docRef = collection(db, "schools");
    await setDoc(doc(docRef, school.uid), {
      uid: school.uid,
      name: school.name,
      categories: school.categories,
    });
  }, []);

  const addVisitor = useCallback(
    async (id: string, category: CategoryNames, count: number) => {
      const docRef = collection(db, "visitors");
      const schoolRef = doc(docRef, dateFormatted);
      const schoolDocRef = await getDoc(schoolRef);
      const school = schoolDocRef.data()?.[id];

      if (school?.[category]) {
        const newCount = school[category] + count;
        await setDoc(
          doc(docRef, dateFormatted),
          {
            [id]: {
              [category]: newCount,
            },
          },
          { merge: true }
        );
        return;
      }

      await setDoc(
        doc(docRef, dateFormatted),
        {
          [id]: {
            [category]: count,
          },
        },
        { merge: true }
      );
    },
    []
  );

  const subtractVisitor = useCallback(
    async (id: string, category: CategoryNames, count: number) => {
      const docRef = collection(db, "visitors");
      const schoolRef = doc(docRef, dateFormatted);
      const schoolDocRef = await getDoc(schoolRef);
      const school = schoolDocRef.data()?.[id];

      if (school?.[category]) {
        const newCount = school[category] - count;
        await setDoc(
          doc(docRef, dateFormatted),
          {
            [id]: {
              [category]: newCount,
            },
          },
          { merge: true }
        );
        return;
      }

      await setDoc(
        doc(docRef, dateFormatted),
        {
          [id]: {
            [category]: count,
          },
        },
        { merge: true }
      );
    },
    []
  );

  return (
    <TallySchoolContext.Provider
      value={{
        category,
        setCategory,
        formattedSchools,
        addSchool,
        addVisitor,
        subtractVisitor,
      }}
    >
      {children}
    </TallySchoolContext.Provider>
  );
};

export { TallySchoolContext };

export default TallySchoolProvider;
