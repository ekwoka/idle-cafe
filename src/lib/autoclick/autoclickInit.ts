import { storeInit, tickFunctions } from '../../data/counterData';

const autoClick = () => Object.values(tickFunctions).forEach((f) => f(0));

export const autoclickInit = () => {
  storeInit();
  setInterval(autoClick, 1000);
};
