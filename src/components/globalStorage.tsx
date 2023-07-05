import React, { ReactNode, createContext, useState } from "react";
import usePersistedStorage from "../hooks/usePersistedStorage";
import useMounted from "../hooks/useMounted";

interface ContextProps {
  page: string;
  regex: RegExp;
  currentUser: string;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  error: boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  login: boolean;
  setCurrentUser: React.Dispatch<React.SetStateAction<string>>;
}
export interface UserProps<T> {
  username: T;
  password: T;
  id: number;
}

interface GlobalStorageProps {
  children: ReactNode;
}
export const globalContext = createContext<ContextProps | null>(null);

export const GlobalStorage = ({ children }: GlobalStorageProps) => {
  const [currentUser, setCurrentUser] = useState("");

  const [error, setError] = useState(false);
  const [login, setLogin] = useState(false);

  const mounted = useMounted();
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  if (!mounted) return <div></div>;
  return (
    <globalContext.Provider
      value={{
        error: error,
        login: login,
        setLogin: setLogin,
        setError: setError,
        page: "Página",
        regex: regex,
        currentUser: currentUser,
        setCurrentUser: setCurrentUser,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};
