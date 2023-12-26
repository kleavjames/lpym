import { FC, ReactNode, createContext, useMemo } from "react";
import { School, VisitorsCount } from "../types/school";
import { Category, CategoryNames } from "../types/category";
import { useFirebase } from "../hooks/useFirebase";

type Props = {
  children: ReactNode;
};

type Context = {
  elementary: School[];
  highSchools: School[];
  colleges: School[];
  communities: School[];
  visitorsCount: VisitorsCount;
};

const ResultsContext = createContext<Context>({
  elementary: [],
  highSchools: [],
  colleges: [],
  communities: [],
  visitorsCount: {
    totalVisitors: 0,
    totalCollege: 0,
    totalCommunity: 0,
    totalElementary: 0,
    totalHighSchools: 0,
  },
});

const ResultsProvider: FC<Props> = ({ children }) => {
  const { schools, visitors } = useFirebase();

  const elementary = useMemo(() => {
    const newSchools = (schools || []).map((school) => {
      return {
        ...school,
        visitors: visitors?.[school.uid]?.[CategoryNames.ELEMENTARY] ?? 0,
      };
    });
    const filteredSchools = (newSchools as School[]).filter((school) =>
      school.categories.includes(Category.ELEMENTARY)
    );
    return filteredSchools.sort((a, b) => b.visitors! - a.visitors!);
  }, [schools, visitors]);

  const highSchools = useMemo(() => {
    const newSchools = (schools || []).map((school) => {
      return {
        ...school,
        visitors: visitors?.[school.uid]?.[CategoryNames.HIGHSCHOOL] ?? 0,
      };
    });
    const filteredSchools = (newSchools as School[]).filter((school) =>
      school.categories.includes(Category.HIGHSCHOOL)
    );
    return filteredSchools.sort((a, b) => b.visitors! - a.visitors!);
  }, [schools, visitors]);

  const colleges = useMemo(() => {
    const newSchools = (schools || []).map((school) => {
      return {
        ...school,
        visitors: visitors?.[school.uid]?.[CategoryNames.COLLEGE] ?? 0,
      };
    });
    const filteredSchools = (newSchools as School[]).filter((school) =>
      school.categories.includes(Category.COLLEGE)
    );
    return filteredSchools.sort((a, b) => b.visitors! - a.visitors!);
  }, [schools, visitors]);

  const communities = useMemo(() => {
    const newSchools = (schools || []).map((school) => {
      return {
        ...school,
        visitors: visitors?.[school.uid]?.[CategoryNames.COMMUNITY] ?? 0,
      };
    });
    const filteredSchools = (newSchools as School[]).filter((school) =>
      school.categories.includes(Category.COMMUNITY)
    );
    return filteredSchools.sort((a, b) => b.visitors! - a.visitors!);
  }, [schools, visitors]);

  const visitorsCount = useMemo(() => {
    let totalVisitors = 0;
    let totalElementary = 0;
    let totalHighSchools = 0;
    let totalCollege = 0;
    let totalCommunity = 0;

    if (visitors) {
      const values = Object.values(visitors!);

      values.map((value) => {
        if (value?.[CategoryNames.ELEMENTARY]) {
          totalVisitors += value?.[CategoryNames.ELEMENTARY];
          totalElementary += value?.[CategoryNames.ELEMENTARY];
        }
        if (value?.[CategoryNames.HIGHSCHOOL]) {
          totalVisitors += value?.[CategoryNames.HIGHSCHOOL];
          totalHighSchools += value?.[CategoryNames.HIGHSCHOOL];
        }
        if (value?.[CategoryNames.COLLEGE]) {
          totalVisitors += value?.[CategoryNames.COLLEGE];
          totalCollege += value?.[CategoryNames.COLLEGE];
        }
        if (value?.[CategoryNames.COMMUNITY]) {
          totalVisitors += value?.[CategoryNames.COMMUNITY];
          totalCommunity += value?.[CategoryNames.COMMUNITY];
        }
      });
    }

    return {
      totalVisitors,
      totalElementary,
      totalCollege,
      totalCommunity,
      totalHighSchools,
    };
  }, [visitors]);

  return (
    <ResultsContext.Provider
      value={{
        elementary,
        highSchools,
        colleges,
        communities,
        visitorsCount,
      }}
    >
      {children}
    </ResultsContext.Provider>
  );
};

export { ResultsContext };

export default ResultsProvider;
