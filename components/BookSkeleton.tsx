import { Skeleton } from "@/components/ui/skeleton";

export default function BookSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800">

      {/* Cover placeholder */}
      <Skeleton className="aspect-[2/3] w-full rounded-none" />

      {/* Content placeholders */}
      <div className="p-3 flex flex-col gap-2">
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-3 w-3/4 rounded" />
        <Skeleton className="h-3 w-1/2 rounded" />

        {/* Badge placeholders */}
        <div className="flex gap-1 mt-1">
          <Skeleton className="h-4 w-14 rounded-full" />
          <Skeleton className="h-4 w-16 rounded-full" />
        </div>
      </div>

    </div>
  );
}