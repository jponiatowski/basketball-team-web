import { Skeleton } from '@radix-ui/themes';

export function TablePlaceholder() {
  return (
    <div className="flex flex-col gap-1">
      <Skeleton height="44px" />
      <Skeleton height="44px" />
      <Skeleton height="44px" />
      <Skeleton height="44px" />
      <Skeleton height="44px" />
      <Skeleton height="44px" />
      <Skeleton height="44px" />
      <Skeleton height="44px" />
    </div>
  );
}
