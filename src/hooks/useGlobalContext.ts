import { useContext } from "react";
import { globalContext } from "../components/globalStorage";

const useGlobalContext = () => {
  const global = useContext(globalContext)!;
  return {
    global,
  };
};

export default useGlobalContext;
