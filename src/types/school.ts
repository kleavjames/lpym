import { Category } from "./category";

export type AddSchool = {
  name: string;
  categories: Category[]
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
  totalHighSchools: number;
  totalCollege: number;
  totalCommunity: number;
}

export type VisitorsCount = {
  totalVisitors: number;
  totalElementary: number;
  totalCollege: number;
  totalCommunity: number;
  totalHighSchools: number;
}