import { useState } from 'preact/hooks';
import { UpgradeOptions, useUpgrade } from '../../hooks/useUpgrade';

type SingleUpgradeProps = {
  options: UpgradeOptions;
  name: string;
};

export const SingleUpgrade = ({ options, name }: SingleUpgradeProps) => {
  const { level, cost, upgrade, enabled } = useUpgrade(options);
  const [isExpanded, setExpanded] = useState<boolean>(false);

  return (
    <>
      <tr class="table-row">
        <td class="table-cell">
          <button
            class="py-6 px-2 text-left"
            onClick={() => setExpanded((p) => !p)}>
            {name}
          </button>
        </td>
        <td class="table-cell px-2 text-right">{level}</td>
        <td class="table-cell max-w-min px-2 text-right">
          {options.display(cost)}
        </td>
        <td class="table-cell max-w-min px-2">
          <button
            class="rounded bg-gray-100 py-2 px-4 text-neutral-800 disabled:opacity-70"
            type="button"
            onClick={upgrade}
            disabled={!enabled}>
            {'==>'}
          </button>
        </td>
      </tr>
      {options.description && isExpanded && (
        <tr>
          <td colSpan={4} class="bg-neutral-600 py-4 px-2">
            {options.description}
          </td>
        </tr>
      )}
    </>
  );
};
