import { JSXInternal } from 'preact/src/jsx';
import { latteData, matchaData, moneyData } from '../../data/counterData';
import { UpgradeOptions } from '../../hooks/useUpgrade';
import { toCurrency } from '../../lib/utils';
import { SingleUpgrade } from './SingleUpgrade';

export const UpgradeTable = () => (
  <>
    {upgrades.map(
      (upgrade): JSXInternal.Element => (
        <SingleUpgrade
          key={upgrade.name}
          name={upgrade.name}
          options={upgrade}
        />
      )
    )}
  </>
);

const upgrades: UpgradeOptions[] = [
  {
    name: 'Latte Maker',
    cost: 50,
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
    cost: 250,
    costType: 'money',
    costFunction:
      (level) =>
      (prev: number): number => {
        if (!level) return prev;
        return prev * (1 + level / 10);
      },
    tickFunction: (level) => () => {
      if (matchaData.lastValue > level || moneyData.lastValue < 150) return;
      matchaData.target += 30;
      moneyData.target -= (100 * 3) / level;
    },
    display: (cost) => toCurrency(cost),
  },
];
