import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { format } from "date-fns/format";
import { db, collection, doc } from "../services/firebase";
import { useMemo } from "react";
import { Category, CategoryNames } from "../types/category";
import { School } from "../types/school";

const dateFormatted = format(new Date(), "MMM-dd-yyyy");

export const useResults = () => {
  const [schools] = useCollectionData(collection(db, "schools"), {
    snapshotListenOptions: {
      includeMetadataChanges: true,
    },
  });

  const [visitors] = useDocumentData(doc(db, `visitors/${dateFormatted}`), {
    snapshotListenOptions: {
      includeMetadataChanges: true,
    },
  });

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

  return {
    elementary,
    highSchools,
    colleges,
    communities,
    visitorsCount,
  };
};
