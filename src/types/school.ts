import { Category, CategoryNames } from "./category";

export type AddSchool = {
  name: string;
  categories: {
    [CategoryNames.ELEMENTARY]: boolean;
    [CategoryNames.JUNIORHIGH]: boolean;
    [CategoryNames.SENIORHIGH]: boolean;
    [CategoryNames.COLLEGE]: boolean;
    [CategoryNames.COMMUNITY]: boolean;
  }
}

export type School = {
  uid: string;
  name: string;
  categories: Category[]
  visitors?: number;
}

export type TotalSchools = {
  totalVisitors: number;
  totalElementary: number;
  totalJuniorHigh: number;
  totalSeniorHigh: number;
  totalCollege: number;
  totalCommunity: number;
}