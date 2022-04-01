import { useGlobalState } from 'preact-global-state';
import { useCallback, useEffect, useState } from 'preact/hooks';
import * as counterData from '../data/counterData';
import { useStorage } from './useStorage';

export type UpgradeOptions = {
  name: string;
  cost: number;
  costType: string;
  costFunction?: (level: number) => (prev: number) => number;
  tickFunction?: (level: number) => (prev: number | undefined) => void;
  display: (cost: number) => string;
};

export function useUpgrade(options: UpgradeOptions) {
  const [clicks] = useGlobalState<number>(options.costType, 0);
  const [level, setLevel] = useStorage<number>(options.name, 0);
  const [cost, setCost] = useState<number>(options.cost);
  const [enabled, setEnabled] = useState<boolean>(false);
  setEnabled(clicks >= cost - 1);
  const upgrade = useCallback(() => {
    if (enabled) {
      // @ts-ignore
      counterData[`${options.costType}Data`].target -= cost;
      setLevel((level) => level + 1);
    }
  }, [enabled]);

  useEffect(() => {
    if (options.costFunction) {
      setCost(options.costFunction(level));
    }
    if (options.tickFunction) {
      counterData.tickFunctions[options.name] = options.tickFunction(level);
    }
  }, [level]);

  return { level, upgrade, cost, enabled };
}
