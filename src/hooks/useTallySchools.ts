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

  return {
    formattedSchools,
    setCategory
  }
}