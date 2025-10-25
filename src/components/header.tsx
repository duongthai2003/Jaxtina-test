"use client";
import Image from "next/image";
import Loading from "~/app/loading";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { useAuth } from "~/hooks/useAuth";
function Header() {
  const { logout, loading } = useAuth();
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
        <PopoverContent className="px-0 py-1 w-fit">
          <div
            className=" px-5 py-1 cursor-pointer hover:bg-[#f7f7f7]"
            onClick={async () => {
              await logout();
            }}
          >
            Đăng xuất
          </div>
        </PopoverContent>
      </Popover>
      {loading && (
        <div
          className=" fixed inset-0 w-full h-full flex justify-center items-center"
          style={{ background: " rgba(0, 0, 0, 0.1)" }}
        >
          <Loading />
        </div>
      )}
    </div>
  );
}

export default Header;
