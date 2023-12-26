import {
    useCollectionData,
  } from "react-firebase-hooks/firestore";
import { collection, db } from "../services/firebase";

export const useUsers = () => {
    const [users] = useCollectionData(collection(db, "users"), {
        snapshotListenOptions: {
          includeMetadataChanges: true,
        },
      });

    return {
        users
    }
}