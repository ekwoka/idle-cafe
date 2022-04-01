import { counterAttr } from '../../data/counterData';
import { animateFrame } from '../utils/animateFrame';
import { autoclickInit } from './autoclickInit';

let initialized = false;
let lastFrame = 0;

export const clickInit = (
  ...dataTypes: [(v: number) => void, counterAttr][]
): void => {
  if (initialized) return;
  autoclickInit();
  const uiUpdater = dataTypes.map((options) => updateUI(...options));
  animateFrame((t: number) => {
    const diff: number = t - lastFrame;
    lastFrame = t;
    uiUpdater.forEach((f) => f(diff));
  });
  initialized = true;
};

const updateUI =
  (setValue: (v: number) => void, itemData: counterAttr) =>
  (diff: number): void => {
    if (isNaN(itemData.target)) itemData.target = 0;
    let transfer: number =
      diff > 500
        ? itemData.target
        : +(itemData.target * (diff / 500)).toFixed(1);
    transfer =
      Math.abs(transfer) > 0.1
        ? transfer
        : transfer < 0
        ? Math.max(-0.1, itemData.target)
        : Math.min(0.1, itemData.target);
    if (isNaN(transfer)) return console.error('transfer is NaN', itemData);
    itemData.target -= transfer;
    const newValue = Number((itemData.lastValue + transfer).toFixed(2));
    setValue(newValue);
    itemData.lastValue = newValue;
  };
