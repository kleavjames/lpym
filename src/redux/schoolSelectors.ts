import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Category, CategoryNames } from "../types/category";

export const selectSchools = (root: RootState) => root.schools;
export const selectVisitors = (root: RootState) => root.visitors;

export const selectElementary = createSelector(
  [selectSchools, selectVisitors],
  (schools, visitors) => {
    const newSchools = schools.map((school) => {
      return {
        ...school,
        visitors: visitors?.[school.nickName]?.[CategoryNames.ELEMENTARY] ?? 0,
      };
    });
    const filteredSchools = newSchools.filter((school) =>
      school.categories.includes(Category.ELEMENTARY)
    );
    return filteredSchools.sort((a, b) => b.visitors - a.visitors);
  }
);

export const selectJuniorHighs = createSelector(
  [selectSchools, selectVisitors],
  (schools, visitors) => {
    const newSchools = schools.map((school) => {
      return {
        ...school,
        visitors: visitors?.[school.nickName]?.[CategoryNames.JUNIORHIGH] ?? 0,
      };
    });
    const filteredSchools = newSchools.filter((school) =>
      school.categories.includes(Category.JUNIORHIGH)
    );
    return filteredSchools.sort((a, b) => b.visitors - a.visitors);
  }
);

export const selectSeniorHighs = createSelector(
  [selectSchools, selectVisitors],
  (schools, visitors) => {
    const newSchools = schools.map((school) => {
      return {
        ...school,
        visitors: visitors?.[school.nickName]?.[CategoryNames.SENIORHIGH] ?? 0,
      };
    });
    const filteredSchools = newSchools.filter((school) =>
      school.categories.includes(Category.SENIORHIGH)
    );
    return filteredSchools.sort((a, b) => b.visitors - a.visitors);
  }
);

export const selectColleges = createSelector(
  [selectSchools, selectVisitors],
  (schools, visitors) => {
    const newSchools = schools.map((school) => {
      return {
        ...school,
        visitors: visitors?.[school.nickName]?.[CategoryNames.COLLEGE] ?? 0,
      };
    });
    const filteredSchools = newSchools.filter((school) =>
      school.categories.includes(Category.COLLEGE)
    );
    return filteredSchools.sort((a, b) => b.visitors - a.visitors);
  }
);

export const selectCommunities = createSelector(
  [selectSchools, selectVisitors],
  (schools, visitors) => {
    const newSchools = schools.map((school) => {
      return {
        ...school,
        visitors: visitors?.[school.nickName]?.[CategoryNames.COMMUNITY] ?? 0,
      };
    });
    const filteredSchools = newSchools.filter((school) =>
      school.categories.includes(Category.COMMUNITY)
    );
    return filteredSchools.sort((a, b) => b.visitors - a.visitors);
  }
);
