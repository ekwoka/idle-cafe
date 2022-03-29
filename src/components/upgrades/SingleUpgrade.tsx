import { UpgradeOptions, useUpgrade } from '../../hooks/useUpgrade';

export const SingleUpgrade = ({
  options,
  name,
}: {
  options: UpgradeOptions;
  name: string;
}) => {
  const { level, cost, upgrade, enabled } = useUpgrade(options);

  return (
    <div class="flex flex-row gap-x-4 text-neutral-100">
      <h2>{name}</h2>
      <div>Level: {level}</div>
      <button
        class="rounded bg-gray-100 py-2 px-4 text-neutral-800 disabled:opacity-70"
        type="button"
        onClick={upgrade}
        disabled={!enabled}>
        Upgrade
      </button>
      <div>Cost: {options.display(cost)}</div>
    </div>
  );
};
