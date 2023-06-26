import { useState } from "react";
import { api } from "../config/axios";
import useGlobalContext from "./useGlobalContext";

type ServerResponseProps =
  | "success"
  | "email nao cadastrado"
  | "password invalid";

export function useFetch(url: string) {
  const [state, setState] = useState<ServerResponseProps>(
    "email nao cadastrado"
  );
  const {
    global: { setCurrentUser },
  } = useGlobalContext();
  api
    .get<{ status: ServerResponseProps; username: string }>(url)
    .then((response) => response.data)
    .then((data) => {
      setState(data.status),
        setCurrentUser({ name: data.username, state: "offline" });
    });

  return [state];
}
