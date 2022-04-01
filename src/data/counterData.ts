export type counterAttr = {
  target: number;
  perSecond: number;
  lastValue: number;
};

export const matchaData: counterAttr = {
  target: 100,
  perSecond: 0,
  lastValue: 0,
};

export const latteData: counterAttr = {
  target: 0,
  perSecond: 0,
  lastValue: 0,
};

export const moneyData: counterAttr = {
  target: 0,
  perSecond: 0,
  lastValue: 0,
};

export const tickFunctions: {
  [key: string]: (prev?: number) => void;
} = {};

export const storeInit = () => {
  dataKeys.forEach(([data, key]) => {
    data.target = Number(localStorage.getItem(key) || data.target);
  });
  tickFunctions.store = () =>
    dataKeys.forEach(([{ lastValue }, key]) =>
      localStorage.setItem(key, lastValue.toString())
    );

    // @ts-ignore
    window.cafeDebug = {
      reset() {
        tickFunctions.store = () => {} // eslint-disable-line no-empty-functions
        dataKeys.forEach(([_, key]) => localStorage.removeItem(key))
      }
    }
};

const dataKeys: [counterAttr, string][] = [
  [matchaData, 'matcha'],
  [latteData, 'latte'],
  [moneyData, 'money'],
];
