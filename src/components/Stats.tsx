import { toCurrency } from '../lib/utils';
import {
  counterAttr,
  latteData,
  matchaData,
  moneyData,
} from '../data/counterData';
import { UseClicks, useClicks } from '../hooks/useClicks';
import { JSXInternal } from 'preact/src/jsx';

export const Stats = () => {
  const values = useClicks();

  return (
    <dl class="grid w-full max-w-screen-sm grid-cols-1 divide-y divide-neutral-600 overflow-hidden rounded-lg bg-neutral-700 shadow md:grid-cols-3 md:divide-y-0 md:divide-x">
      {stats.map((item) => {
        const key: string = item.name.toLowerCase();
        const value = values[key as keyof typeof values];
        return (
          <div
            key={item.name}
            class="flex flex-col items-start gap-y-4 px-4 py-5 sm:p-6">
            <dt class="text-lg font-normal text-emerald-400">{item.name}</dt>
            <dd class="flex w-full flex-col items-center justify-between gap-4">
              <div class="flex items-baseline text-3xl font-semibold text-emerald-600">
                {item.display(value)}
              </div>
            </dd>
            {item.function && (
              <button
                class="mx-auto px-4 py-2 text-neutral-100 disabled:opacity-50"
                disabled={item.function.isDisabled(values)}
                onClick={item.function.func(values)}>
                {item.function.label}
              </button>
            )}
          </div>
        );
      })}
    </dl>
  );
};

type stat = {
  name: string;
  data: counterAttr;
  display: (value: number) => string | JSXInternal.Element;
  function?: {
    label: string;
    func: (values: UseClicks) => () => void;
    isDisabled: (values: UseClicks) => boolean;
  };
};

const stats: stat[] = [
  {
    name: 'Matcha',
    data: matchaData,
    display: (value) => value.toFixed(0),
    function: {
      label: 'Buy Matcha (30 for $100)',
      func: (values) => () => {
        if (values.money >= 10000) {
          matchaData.target += 30;
          moneyData.target -= 10000;
        }
      },
      isDisabled: (values) => values.money < 100,
    },
  },
  {
    name: 'Lattes',
    data: latteData,
    display: (value) => value.toFixed(0),
    function: {
      label: 'Make Latte',
      func: (values: UseClicks) => () => {
        if (values.matcha <= 0) return;
        matchaData.target -= 1;
        latteData.target += 1;
      },
      isDisabled: (values) => values.matcha <= 0,
    },
  },
  {
    name: 'Money',
    data: moneyData,
    display: (value) => {
      const string = toCurrency(value);
      return value >= 0 ? (
        string
      ) : (
        <>
          {string}
          <span class="text-sm text-red-400">-4%</span>
        </>
      );
    },
  },
];
