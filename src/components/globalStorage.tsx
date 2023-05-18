import React, { ReactNode, createContext } from "react";
import usePersistedStorage from "../hooks/usePersistedStorage";

interface ContextProps<T> {
  page: T;
  user: UserProps<string>[];
  setUser: React.Dispatch<React.SetStateAction<UserProps<string>[]>>;
}

interface UserProps<T> {
  username: T;
  password: T;
}
interface GlobalStorageProps {
  children: ReactNode;
}
export const globalContext = createContext<ContextProps<string> | null>(null);

export const GlobalStorage = ({ children }: GlobalStorageProps) => {
  const [user, setUser] = usePersistedStorage<UserProps<string>[]>(
    "dataUser",
    []
  );
  return (
    <globalContext.Provider
      value={{ page: "Página", user: user, setUser: setUser }}
    >
      {children}
    </globalContext.Provider>
  );
};
