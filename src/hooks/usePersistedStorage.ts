import { SetStateAction, useEffect, useState, Dispatch } from "react";

type PersistedStorageProps<S> = [S, Dispatch<SetStateAction<S>>];

export default function usePersistedStorage<S>(
  key: "dataUser" | "currentUser",
  initialState: S
): PersistedStorageProps<S> {
  const [state, setState] = useState(() => {
    if (typeof window !== "undefined") {
      const stateStorage = localStorage.getItem(key);
      if (stateStorage) return JSON.parse(stateStorage) as S;
      else return initialState;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);
  return [state!, setState as Dispatch<SetStateAction<S>>];
}
