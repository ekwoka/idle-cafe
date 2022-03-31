import { useGlobalState } from 'preact-global-state';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { latteData, moneyData, tickFunctions } from '../data/counterData';
import { toCurrency } from '../lib/utils';

export const Market = () => {
  const [demand] = useGlobalState<number>('demand', 1);
  const [price, setPrice] = useState<number>(7);
  const [breakpoint, setBreakpoint] = useState<number>(0);
  const sales = useCallback(() => {
    if (latteData.lastValue <= 0) return;

    const toSell = Math.floor(Math.random() / breakpoint);

    latteData.target -= Math.min(toSell, latteData.lastValue);
    moneyData.target += Math.min(toSell, latteData.lastValue) * price;
  }, [breakpoint]);

  useEffect(() => setBreakpoint(price / 15 / demand), [demand, price]);

  useEffect(() => {
    tickFunctions.market = sales;
  }, [sales]);

  return (
    <div class="flex flex-col gap-y-2 text-neutral-100" onClick={sales}>
      <h2>Market</h2>
      <div class="flex flex-row gap-x-2">
        <button
          class="rounded bg-gray-100 px-4 py-2 text-center text-neutral-800"
          type="button"
          onClick={useCallback(
            () => setPrice((prev) => (prev <= 0.2 ? 0.1 : prev - 0.1)),
            []
          )}>
          -$0.10
        </button>
        <span>{toCurrency(price)}</span>
        <button
          class="rounded bg-gray-100 px-4 py-2 text-center text-neutral-800"
          type="button"
          onClick={useCallback(() => setPrice((prev) => prev + 0.1), [])}>
          +$0.10
        </button>
      </div>
    </div>
  );
};
