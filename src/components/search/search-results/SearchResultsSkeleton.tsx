export function SearchResultsSkeleton() {
  return (
    <div className="grid gap-5">
      <HotelCardSkeleton />
      <HotelCardSkeleton />
      <HotelCardSkeleton />
    </div>
  );
}

function HotelCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm md:flex">
      <div className="h-[250px] animate-pulse bg-gray-200 md:w-[320px]" />

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="h-7 w-2/3 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
        <div className="h-20 w-full animate-pulse rounded bg-gray-200" />
        <div className="mt-auto h-10 w-40 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
}