import { Skeleton } from "./ui/skeleton";

export function SkeletonCourse() {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-3  lg:grid-cols-4 ">
      {new Array(8).fill(1).map((_, index) => {
        return (
          <div key={index} className="px-2 mt-4  ">
            <Skeleton className="rounded-2xl h-60 overflow-hidden" />
          </div>
        );
      })}
    </div>
  );
}

export function CourseDetailSkeleton() {
  return (
    <div>
      <Skeleton className="rounded-md w-full h-[450px]" />
      <div>
        <div className=" flex justify-between items-center mt-11">
          <Skeleton className=" h-7 w-1/3" />
          <Skeleton className=" h-7 w-1/6" />
        </div>
        <Skeleton className="mt-4 h-7" />
      </div>
      <div className="mt-5">
        <Skeleton className="w-1/2 h-7" />
        <Skeleton className="w-1/3 mt-2 h-7" />
        <div className=" mt-4 max-w-[700px] hidden md:block">
          {new Array(2).fill(1).map((_, index) => {
            return <Skeleton key={index} className=" h-9 mt-2" />;
          })}
        </div>
      </div>
    </div>
  );
}

export function LessionSkeleton() {
  return (
    <div>
      <Skeleton className="rounded-md w-full h-[200px] md:h-[450px]" />
      <div>
        <div className=" flex justify-between items-center mt-11">
          <Skeleton className=" h-7 w-1/3" />
          <Skeleton className=" h-7 w-1/6" />
        </div>
        <Skeleton className="mt-4 h-20" />
      </div>
    </div>
  );
}
