import React, { ReactNode, createContext } from "react";

interface ContextProps {
  name: string;
  age: number;
}
interface GlobalStorageProps {
  children: ReactNode;
}
export const globalContext = createContext<ContextProps | null>(null);

export const GlobalStorage = ({ children }: GlobalStorageProps) => {
  return (
    <globalContext.Provider value={{ name: "pascoal", age: 21 }}>
      {children}
    </globalContext.Provider>
  );
};
