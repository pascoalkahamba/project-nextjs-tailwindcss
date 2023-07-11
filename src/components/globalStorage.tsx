import React, { ReactNode, createContext, useState } from "react";
import usePersistedStorage from "../hooks/usePersistedStorage";
import useMounted from "../hooks/useMounted";

interface ContextProps {
  page: string;
  regex: RegExp;
  currentUser: string;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  error: boolean;
  modal: boolean;
  infoDogs: InfoDogsProps[];
  setInfoDogs: React.Dispatch<React.SetStateAction<InfoDogsProps[]>>;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  login: boolean;
  setCurrentUser: React.Dispatch<React.SetStateAction<string>>;
}
export interface UserProps<T> {
  username: T;
  password: T;
  id: number;
}

interface InfoDogsProps {
  name: string;
  weight: number;
  age: number;
}

interface GlobalStorageProps {
  children: ReactNode;
}
export const globalContext = createContext<ContextProps | null>(null);

export const GlobalStorage = ({ children }: GlobalStorageProps) => {
  const [currentUser, setCurrentUser] = useState("");
  const [infoDogs, setInfoDogs] = useState<InfoDogsProps[]>([]);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);
  const [login, setLogin] = useState(false);

  const mounted = useMounted();
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  if (!mounted) return <div></div>;
  return (
    <globalContext.Provider
      value={{
        error: error,
        infoDogs: infoDogs,
        setInfoDogs: setInfoDogs,
        login: login,
        modal: modal,
        setModal: setModal,
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
