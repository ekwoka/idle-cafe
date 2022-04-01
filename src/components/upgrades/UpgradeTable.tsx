import { JSXInternal } from 'preact/src/jsx';
import { upgradeData } from '../../data/upgradeData';
import { SingleUpgrade } from './SingleUpgrade';

export const UpgradeTable = () => (
  <table class="table-fixed border-collapse divide-y divide-neutral-400 px-4 text-neutral-100">
    <thead class="table-header-group">
      <tr class="table-row">
        <th scope="col" class="table-cell px-2 text-left">
          Name
        </th>
        <th scope="col" class="table-cell px-2 text-right">
          Level
        </th>
        <th scope="col" class="table-cell px-2 text-right">
          Cost
        </th>
        <th scope="col" class="table-cell px-2">
          Upgrade
        </th>
      </tr>
    </thead>
    <tbody class="table-row-group divide-y divide-neutral-700">
      {upgradeData.map(
        (upgrade): JSXInternal.Element => (
          <SingleUpgrade
            key={upgrade.name}
            name={upgrade.name}
            options={upgrade}
          />
        )
      )}
    </tbody>
  </table>
);
