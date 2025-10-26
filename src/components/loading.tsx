"use client";
import { cn } from "~/lib/utils";
type LoadingType = {
  width?: string;
  height?: string;
};
function Loading({ width = "25px", height = "25px" }: LoadingType) {
  return (
    <div
      className={cn(
        "border-4 border-solid border-[#e4ebf0] relative rounded-full"
      )}
      style={{ width: width, height: height }}
    >
      <div className="loader" style={{ width: width, height: height }}></div>
    </div>
  );
}
export default Loading;
