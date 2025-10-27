"use client";
import { cn } from "~/lib/utils";
type LoadingIconType = {
  width?: string;
  height?: string;
};
function LoadingIcon({ width = "25px", height = "25px" }: LoadingIconType) {
  return (
    <div
      className={cn(
        "border-4 border-solid border-[#e4ebf0] relative rounded-full"
      )}
      style={{ width: width, height: height }}
    >
      <div
        className="loader loader_rotate"
        style={{ width: width, height: height }}
      ></div>
    </div>
  );
}
export default LoadingIcon;
