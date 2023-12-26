import { useCallback } from "react"
import { addDoc, collection, db } from "../services/firebase";
import { Account } from "../types/accounts";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

export const useAccounts = () => {
  const createAccount = useCallback(async (acc: Account) => {
    const hashPassword = bcrypt.hashSync(acc.password, salt);

    const docRef = collection(db, "users");
    await addDoc(docRef, {
      name: acc.name,
      username: acc.username,
      password: hashPassword,
      role: acc.role,
    });
  }, [])

  return {
    createAccount
  }
}