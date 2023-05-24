import React, { ReactNode, createContext } from "react";
import usePersistedStorage from "../hooks/usePersistedStorage";
import useMounted from "../hooks/useMounted";

interface ContextProps<T> {
  page: T;
  user: UserProps<T>[];
  currentUser: CurrentUserProps;
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

  const mounted = useMounted();

  if (!mounted) return <div></div>;
  return (
    <globalContext.Provider
      value={{
        page: "Página",
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
