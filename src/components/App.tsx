import { Stats } from './Stats';
import { Hero } from './Hero';
import { UpgradeTable } from './upgrades/UpgradeTable';
import { Market } from './Market';

export const App = () => (
  <>
    <Hero />
    <Stats />
    <Market />
    <UpgradeTable />
  </>
);
