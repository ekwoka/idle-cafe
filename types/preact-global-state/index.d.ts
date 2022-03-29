declare module 'preact-global-state' {
  const useGlobalState: <T>(key: string, defaultValue: T) => [T, (value: T) => void];
  const store: Store;

  export { useGlobalState, store };
}
