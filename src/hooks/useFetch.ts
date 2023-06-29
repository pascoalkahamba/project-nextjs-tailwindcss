import { useState, useEffect } from "react";
import { api } from "../config/axios";
import useGlobalContext from "./useGlobalContext";

type ServerResponseProps =
  | "success"
  | "email nao cadastrado"
  | "password invalid";

interface FetchProps {
  status: ServerResponseProps;
  username: string;
}

export function useFetch(url: string) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ServerResponseProps>(
    "email nao cadastrado"
  );

  const {
    global: { setCurrentUser },
  } = useGlobalContext();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get<FetchProps>(url);
        if (isMounted) {
          setResponse(response.data.status);
          setCurrentUser(response.data.username);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url, setCurrentUser]);

  return { response, loading, setLoading };
}
