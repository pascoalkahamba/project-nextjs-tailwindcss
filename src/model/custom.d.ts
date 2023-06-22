import { ParsedUrlQuery } from "querystring";

interface CustomQuery extends ParsedUrlQuery {
  email: string;
  password: string;
}
