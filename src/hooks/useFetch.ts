import { useState } from "react";
import { api } from "../config/axios";
type ServerResponseProps =
  | "success"
  | "email nao cadastrado"
  | "password invalid";

export function useFetch(url: string) {
  const [state, setState] = useState<ServerResponseProps>(
    "email nao cadastrado"
  );
  api
    .get<{ status: ServerResponseProps }>(url)
    .then((response) => response.data)
    .then((data) => setState(data.status));

  return [state, setState];
}
