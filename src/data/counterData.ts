export type counterAttr = {
  target: number;
  lastValue: number;
};

export const matchaData: counterAttr = {
  target: 100,
  lastValue: 0,
};

export const latteData: counterAttr = {
  target: 0,
  lastValue: 0,
};

export const moneyData: counterAttr = {
  target: 0,
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
      tickFunctions.store = () => {}; // eslint-disable-line @typescript-eslint/no-empty-function
      dataKeys.forEach((key) => localStorage.removeItem(key[1]));
    },
  };
};

const dataKeys: [counterAttr, string][] = [
  [matchaData, 'matcha'],
  [latteData, 'latte'],
  [moneyData, 'money'],
];
