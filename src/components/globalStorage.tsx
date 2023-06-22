import React, { ReactNode, createContext, useState } from "react";
import usePersistedStorage from "../hooks/usePersistedStorage";
import useMounted from "../hooks/useMounted";

interface ContextProps<T> {
  page: T;
  user: UserProps<T>[];
  regex: RegExp;
  currentUser: CurrentUserProps;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  error: boolean;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUserProps>>;
  setUser: React.Dispatch<React.SetStateAction<UserProps<T>[]>>;
}

export interface UserProps<T> {
  username: T;
  password: T;
  id: number;
}
interface CurrentUserProps {
  name: string;
  id?: number;
}

interface GlobalStorageProps {
  children: ReactNode;
}
export const globalContext = createContext<ContextProps<string> | null>(null);

export const GlobalStorage = ({ children }: GlobalStorageProps) => {
  const [currentUser, setCurrentUser] = usePersistedStorage<CurrentUserProps>(
    "currentUser",
    {
      name: "Login",
      id: 0,
    }
  );

  const [user, setUser] = usePersistedStorage<UserProps<string>[]>(
    "dataUser",
    []
  );
  const [error, setError] = useState(false);

  const mounted = useMounted();
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  if (!mounted) return <div></div>;
  return (
    <globalContext.Provider
      value={{
        error: error,
        setError: setError,
        page: "Página",
        regex: regex,
        user: user,
        setUser: setUser,
        currentUser: currentUser,
        setCurrentUser: setCurrentUser,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};
