import { CategoryNames } from "./category";

export type AddSchool = {
  name: string;
  nickName: string;
  categories: {
    [CategoryNames.ELEMENTARY]: boolean;
    [CategoryNames.HIGHSCHOOL]: boolean;
    [CategoryNames.SENIORHIGH]: boolean;
    [CategoryNames.COLLEGE]: boolean;
    [CategoryNames.COMMUNITY]: boolean;
  }
}