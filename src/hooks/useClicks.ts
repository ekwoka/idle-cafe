import { useEffect } from 'preact/hooks';
import { useGlobalState } from 'preact-global-state';
import { clickInit } from '../lib/autoclick/clickInit';
import { latteData, matchaData, moneyData } from '../data/counterData';

export type UseClicks = {
  lattes: number;
  matcha: number;
  money: number;
};

export function useClicks(): UseClicks {
  const [lattes, setLattes] = useGlobalState<number>('lattes', 0);
  const [matcha, setMatcha] = useGlobalState<number>('matcha', 0);
  const [money, setMoney] = useGlobalState<number>('money', 0);

  useEffect(
    () =>
      clickInit(
        [setLattes, latteData],
        [setMatcha, matchaData],
        [setMoney, moneyData]
      ),
    []
  );
  return { lattes, matcha, money };
}
