import { UpgradeOptions } from '../hooks/useUpgrade';
import { toCurrency } from '../lib/utils';
import { latteData, matchaData, moneyData } from './counterData';

export const upgradeData: UpgradeOptions[] = [
  {
    name: 'Latte Maker',
    cost: 5000,
    costType: 'money',
    costFunction:
      (level) =>
      (prev: number): number => {
        if (!level) return prev;
        console.log(`level: ${level}`, `prev: ${prev}`);
        return prev * 1.05;
      },
    tickFunction: (level) => () => {
      const change = Math.min(matchaData.lastValue, level);
      matchaData.target -= change;
      latteData.target += change;
    },
    display: (cost) => toCurrency(cost),
  },
  {
    name: 'Just-in-time Deliveries',
    cost: 25000,
    costType: 'money',
    costFunction:
      (level) =>
      (prev: number): number => {
        if (!level) return prev;
        return prev * (1 + level / 10);
      },
    tickFunction: (level) =>
      level
        ? () => {
            if (matchaData.lastValue > level || moneyData.lastValue < 15000)
              return;
            matchaData.target += 30;
            moneyData.target -= 10000 * 1.05 ** (5 - level);
          }
        : () => {}, //eslint-disable-line @typescript-eslint/no-empty-function
    display: (cost) => toCurrency(cost),
  },
];
