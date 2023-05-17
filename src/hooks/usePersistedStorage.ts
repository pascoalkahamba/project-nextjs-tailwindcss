import { stringify } from "querystring";
import { useEffect } from "react";
import { SetStateAction, useState, Dispatch } from "react";

type PersistedStorageProps<S> = [S, Dispatch<SetStateAction<S>>];

export function usePersistedStorage<S>(
  key: "dataUser",
  initialState: S
): PersistedStorageProps<S> {
  const [state, setState] = useState(() => {
    const stateStorage = localStorage.getItem(key);
    if (stateStorage) return JSON.parse(stateStorage) as S;
    else return initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);
  return [state, setState];
}
