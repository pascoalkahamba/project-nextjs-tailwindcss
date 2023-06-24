import { useState } from "react";
import { api } from "../config/axios";
type ServerResponsePrpos =
  | "success"
  | "email nao cadastrado"
  | "password invalid";

export function useFetch(url: string) {
  const [state, setState] = useState<ServerResponsePrpos>(
    "email nao cadastrado"
  );
  api
    .get<{ status: ServerResponsePrpos }>(url)
    .then((response) => response.data)
    .then((data) => setState(data.status));

  return [state, setState];
}
