import { StateUpdater, useEffect, useMemo, useState } from "preact/hooks";

export function useStorage<Type>(key: string, initialState: Type | (() => Type)): [Type, StateUpdater<Type>] {
  const formattedKey = useMemo<string>(() => key.toLowerCase().replace(' ','_'), [key])
  const [state, setState] = useState<Type>(JSON.parse(localStorage.getItem(formattedKey) as string) || initialState);

  useEffect(() => localStorage.setItem(formattedKey, JSON.stringify(state)), [state])

  return [state, setState]
}
