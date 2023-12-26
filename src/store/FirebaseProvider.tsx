import { FC, ReactNode, createContext } from "react";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { DocumentData, collection, db, doc } from "../services/firebase";
import { format } from "date-fns/format";

type Props = {
  children: ReactNode;
};

type Context = {
  schools: DocumentData[] | undefined;
  users: DocumentData[] | undefined;
  visitors: DocumentData | undefined;
  flags: {
    underMaintenance: boolean;
    closed: boolean;
    testing: boolean;
  };
};

const dateFormatted = format(new Date(), "MMM-dd-yyyy");

const FirebaseContext = createContext<Context>({
  schools: [],
  users: [],
  visitors: [],
  flags: {
    underMaintenance: false,
    closed: false,
    testing: false,
  },
});

const FirebaseProvider: FC<Props> = ({ children }) => {
  const [schools] = useCollectionData(collection(db, "schools"), {
    snapshotListenOptions: {
      includeMetadataChanges: true,
    },
  });
  const [featureFlags] = useCollectionData(collection(db, "featureFlags"), {
    snapshotListenOptions: {
      includeMetadataChanges: true,
    },
  });
  const [visitors] = useDocumentData(doc(db, `visitors/${dateFormatted}`), {
    snapshotListenOptions: {
      includeMetadataChanges: true,
    },
  });
  const [users] = useCollectionData(collection(db, "users"), {
    snapshotListenOptions: {
      includeMetadataChanges: true,
    },
  });

  const FFlags = featureFlags?.[0];
  const flags = {
    underMaintenance: FFlags ? Boolean(FFlags.underMaintenance) : false,
    closed: FFlags ? Boolean(FFlags.closed) : false,
    testing: FFlags ? Boolean(FFlags.testing) : false,
  };

  return (
    <FirebaseContext.Provider
      value={{
        schools,
        visitors,
        users,
        flags,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseContext };

export default FirebaseProvider;
