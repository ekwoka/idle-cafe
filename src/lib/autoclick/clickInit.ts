import { latteData } from '../../data/counterData';
import { animateFrame } from '../utils/animateFrame';
import { autoclickInit } from './autoclickInit';

let initialized = false;
let lastFrame = 0;

export const clickInit = (
  ...dataTypes: [(v: number) => void, typeof latteData][]
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
  (setValue: (v: number) => void, itemData: typeof latteData) =>
  (diff: number): void => {
    let transfer: number = +(itemData.target * (diff / 500)).toFixed(1);
    transfer =
      Math.abs(transfer) > 0.1 ? transfer : Math.min(0.1, itemData.target);
    itemData.target -= transfer;
    setValue(itemData.lastValue + transfer);
    itemData.lastValue += transfer;
  };
