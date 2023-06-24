import React, { ReactNode, createContext, useState } from "react";
import usePersistedStorage from "../hooks/usePersistedStorage";
import useMounted from "../hooks/useMounted";

interface ContextProps {
  page: string;
  regex: RegExp;
  currentUser: CurrentUserProps;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  error: boolean;
  funHandleChange: HandleChangeProps;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUserProps>>;
  setServerResponse: React.Dispatch<React.SetStateAction<ServerResponsePrpos>>;
  serverResponse: ServerResponsePrpos;
  setForm: React.Dispatch<
    React.SetStateAction<{
      username: string;
      password: string;
      password2: string;
      email: string;
    }>
  >;
  form: {
    username: string;
    password: string;
    password2: string;
    email: string;
  };
}

type HandleChangeProps = React.ChangeEventHandler<HTMLInputElement> | undefined;
export type ServerResponsePrpos =
  | "success"
  | "email nao cadastrado"
  | "password invalid";

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
export const globalContext = createContext<ContextProps | null>(null);

export const GlobalStorage = ({ children }: GlobalStorageProps) => {
  const [serverResponse, setServerResponse] = useState<ServerResponsePrpos>(
    "email nao cadastrado"
  );
  const [form, setForm] = useState({
    username: "",
    password: "",
    password2: "",
    email: "",
  });
  const [currentUser, setCurrentUser] = usePersistedStorage<CurrentUserProps>(
    "currentUser",
    {
      name: "Login",
      id: 0,
    }
  );

  const [error, setError] = useState(false);

  const funHandleChange: HandleChangeProps = ({ target }) => {
    setForm({ ...form, [target.id]: target.value });
  };

  const mounted = useMounted();
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  if (!mounted) return <div></div>;
  return (
    <globalContext.Provider
      value={{
        error: error,
        serverResponse,
        setServerResponse,
        form,
        setForm,
        setError: setError,
        funHandleChange: funHandleChange,
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
