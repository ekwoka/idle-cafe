export const classNames = (...classes: string[]) =>
  classes.filter(Boolean).join(' ');

export const toCurrency = (value: number): string => {
  return (value / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export { animateFrame } from './animateFrame';
