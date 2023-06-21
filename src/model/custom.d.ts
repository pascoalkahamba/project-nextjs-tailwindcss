import { ParsedUrlQuery } from "querystring";

interface CustomQuery extends ParsedUrlQuery {
  email: string;
  // adicione outros parâmetros aqui
}
