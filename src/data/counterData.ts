type counterAttr = {
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
