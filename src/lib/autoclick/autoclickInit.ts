import { tickFunctions } from '../../data/counterData';

const autoClick = () => Object.values(tickFunctions).forEach((f) => f(0));

export const autoclickInit = () => {
  setInterval(autoClick, 1000);
};
