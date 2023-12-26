import { useContext } from "react";
import { FirebaseContext } from "../store/FirebaseProvider";

export const useFirebase = () => {
  return useContext(FirebaseContext);
};
