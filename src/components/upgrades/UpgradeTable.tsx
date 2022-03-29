import { JSXInternal } from 'preact/src/jsx';
import { latteData, matchaData } from '../../data/counterData';
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
    cost: 10,
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
];
