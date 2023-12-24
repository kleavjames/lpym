import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { db, collection, doc } from "../services/firebase";
import { useMemo, useState } from "react";
import { School } from "../types/school";
import { Category, CategoryNames } from "../types/category";

export const useTallySchools = () => {
  const [category, setCategory] = useState(Category.SENIORHIGH)

  const [schools] = useCollectionData(collection(db, "schools"), {
    snapshotListenOptions: {
      includeMetadataChanges: true
    }
  });

  const [visitors] = useDocumentData(doc(db, `visitors/Dec-22-2023`), {
    snapshotListenOptions: {
      includeMetadataChanges: true
    }
  });

  const formattedSchools = useMemo(() => {
    let categoryName = CategoryNames.SENIORHIGH;

    if (category === Category.ELEMENTARY) categoryName = CategoryNames.ELEMENTARY;
    if (category === Category.SENIORHIGH) categoryName = CategoryNames.SENIORHIGH;
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

  const visitorsCount = useMemo(() => {
    let totalVisitors = 0;
    let totalElementary = 0;
    let totalHighSchool = 0;
    let totalCollege = 0;
    let totalCommunity = 0;

    if (visitors) {
      const values = Object.values(visitors!);
  
      values.map(value => {
        if (value?.[CategoryNames.ELEMENTARY]) {
          totalVisitors += value?.[CategoryNames.ELEMENTARY];
          totalElementary += value?.[CategoryNames.ELEMENTARY];
        }
        if (value?.[CategoryNames.SENIORHIGH]) {
          totalVisitors += value?.[CategoryNames.SENIORHIGH]
          totalHighSchool += value?.[CategoryNames.SENIORHIGH]
        }
        if (value?.[CategoryNames.COLLEGE]) {
          totalVisitors += value?.[CategoryNames.COLLEGE];
          totalCollege += value?.[CategoryNames.COLLEGE];
        }
        if (value?.[CategoryNames.COMMUNITY]) {
          totalVisitors += value?.[CategoryNames.COMMUNITY]
          totalCommunity += value?.[CategoryNames.COMMUNITY]
        }
      })
    }

    return {
      totalVisitors,
      totalElementary,
      totalCollege,
      totalCommunity,
      totalHighSchool,
    };
  }, [visitors])

  return {
    formattedSchools,
    setCategory,
    visitorsCount,
  }
}