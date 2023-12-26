import { useCollectionData } from "react-firebase-hooks/firestore";
import { db, collection } from "../services/firebase";

export const useFlags = () => {
  const [featureFlags] = useCollectionData(collection(db, "featureFlags"), {
    snapshotListenOptions: {
      includeMetadataChanges: true,
    },
  });

  const flags = featureFlags?.[0];
  console.log(flags)

  return {
    underMaintenance: flags ? flags.underMaintenance : false,
    closed: flags ? flags.closed : false,
    testing: flags ? flags.testing : false,
  }
};
