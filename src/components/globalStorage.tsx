import React, { ReactNode, createContext } from "react";
import usePersistedStorage from "../hooks/usePersistedStorage";

interface ContextProps {
  name: string;
  age: number;
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
export const globalContext = createContext<ContextProps | null>(null);

export const GlobalStorage = ({ children }: GlobalStorageProps) => {
  const [user, setUser] = usePersistedStorage<UserProps<string>[]>(
    "dataUser",
    []
  );
  return (
    <globalContext.Provider
      value={{ name: "pascoal", age: 21, user: user, setUser: setUser }}
    >
      {children}
    </globalContext.Provider>
  );
};
