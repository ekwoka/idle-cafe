import { toCurrency } from '../lib/utils';
import { latteData, matchaData, moneyData } from '../data/counterData';
import { UseClicks, useClicks } from '../hooks/useClicks';

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
                {item.name === 'Money' ? toCurrency(value) : value.toFixed(0)}
              </div>
              {/* <div
                class={classNames(
                  item.changeType === 'increase'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800',
                  'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0'
                )}>
                <span class="sr-only">
                  {item.changeType === 'increase' ? 'Increased' : 'Decreased'}{' '}
                  by
                </span>
                {item.change}
              </div> */}
            </dd>
            {item.function && (
              <button
                class="mx-auto px-4 py-2 text-neutral-100"
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
  data: typeof latteData;
  function?: {
    label: string;
    func: (values: UseClicks) => () => void;
  };
};

const stats: stat[] = [
  {
    name: 'Matcha',
    data: matchaData,
    function: {
      label: 'Buy Matcha (30 for $50)',
      func: (values) => () => {
        if (values.money >= 50) {
          matchaData.target += 30;
          moneyData.target -= 50;
        }
      },
    },
  },
  {
    name: 'Lattes',
    data: latteData,
    function: {
      label: 'Make Latte',
      func: (values: UseClicks) => () => {
        if (values.matcha <= 0) return;
        matchaData.target -= 1;
        latteData.target += 1;
      },
    },
  },
  {
    name: 'Money',
    data: moneyData,
  },
];
