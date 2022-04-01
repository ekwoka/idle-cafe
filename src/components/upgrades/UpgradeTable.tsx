import { JSXInternal } from 'preact/src/jsx';
import { latteData, matchaData, moneyData } from '../../data/counterData';
import { UpgradeOptions } from '../../hooks/useUpgrade';
import { toCurrency } from '../../lib/utils';
import { SingleUpgrade } from './SingleUpgrade';

export const UpgradeTable = () => (
  <table class="table-fixed border-collapse divide-y divide-neutral-400 px-4 text-neutral-100">
    <thead class="table-header-group">
      <tr class="table-row">
        <th scope="col" class="table-cell px-2 text-left">
          Name
        </th>
        <th scope="col" class="table-cell px-2 text-right">
          Level
        </th>
        <th scope="col" class="table-cell px-2 text-right">
          Cost
        </th>
        <th scope="col" class="table-cell px-2">
          Upgrade
        </th>
      </tr>
    </thead>
    <tbody class="table-row-group divide-y divide-neutral-700">
      {upgrades.map(
        (upgrade): JSXInternal.Element => (
          <SingleUpgrade
            key={upgrade.name}
            name={upgrade.name}
            options={upgrade}
          />
        )
      )}
    </tbody>
  </table>
);

const upgrades: UpgradeOptions[] = [
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
