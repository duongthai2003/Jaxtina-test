"use client";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
function Header() {
  return (
    <div className=" flex justify-between px-10 py-2 bg-[#f7f7f7]">
      <Image
        src="https://jaxtina.com/wp-content/themes/jax2024/img/logo.svg"
        alt="logo"
        width={100}
        height={100}
        priority
        style={{ height: "auto", width: "169px" }}
      />

      <Popover>
        <PopoverTrigger>
          <div className="h-9 w-9 cursor-pointer rounded-full overflow-hidden">
            <Image
              src="/mtc.png"
              alt="logo"
              width={100}
              height={100}
              priority
              className=" w-full h-full object-cover"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent>Place content for the popover here.</PopoverContent>
      </Popover>
    </div>
  );
}

export default Header;
