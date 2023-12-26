import { useContext } from "react";
import { TallySchoolContext } from "../store/TallySchoolProvider";

export const useTallySchools = () => {
  return useContext(TallySchoolContext);
};
