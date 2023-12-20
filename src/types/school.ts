import { Category, CategoryNames } from "./category";

export type AddSchool = {
  name: string;
  nickName: string;
  categories: {
    [CategoryNames.ELEMENTARY]: boolean;
    [CategoryNames.JUNIORHIGH]: boolean;
    [CategoryNames.SENIORHIGH]: boolean;
    [CategoryNames.COLLEGE]: boolean;
    [CategoryNames.COMMUNITY]: boolean;
  }
}

export type School = {
  id: string;
  name: string;
  nickName: string;
  categories: Category[]
  visitors?: number;
}