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
        return prev * 1.05;
      },
    tickFunction: (level) => () => {
      const change = Math.min(matchaData.lastValue, level);
      matchaData.target -= change;
      latteData.target += change;
    },
    display: (cost) => toCurrency(cost),
    description: 'Makes 1 latte per level per second automagically.',
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
            const nextTick = matchaData.lastValue + matchaData.target;
            if (nextTick > level || moneyData.lastValue < 15000) return;
            const toBuy = Math.min(
              Math.floor(moneyData.lastValue / 15000),
              level
            );
            matchaData.target += 30 * toBuy;
            moneyData.target -= 10000 * 1.05 ** (5 - level) * toBuy;
          }
        : () => {}, //eslint-disable-line @typescript-eslint/no-empty-function
    display: (cost) => toCurrency(cost),
    description:
      'Autobuys Matcha at an adjusted price of $100 * 1.05 ** (5 - level)',
  },
  {
    name: 'Addictive Ingredients',
    cost: 100000,
    costType: 'money',
    costFunction: (level) => (prev) => {
      if (!level) return prev;
      return Infinity;
    },
    display: (cost) => toCurrency(cost),
    description: 'Increases Market Demand',
  },
];
