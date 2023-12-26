import { useContext } from "react";
import { ResultsContext } from "../store/ResultsProvider";

export const useResults = () => {
  return useContext(ResultsContext);
};
