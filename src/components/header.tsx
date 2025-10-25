"use client";
import Image from "next/image";
import Loading from "~/app/loading";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { useAuth } from "~/hooks/useAuth";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "~/lib/utils";
function Header() {
  const { logout, loading } = useAuth();
  const { setTheme, theme } = useTheme();
  return (
    <div className=" flex justify-between px-10 py-2 dark:bg-transparent bg-[#f7f7f7]">
      <Image
        src="https://jaxtina.com/wp-content/themes/jax2024/img/logo.svg"
        alt="logo"
        width={100}
        height={100}
        priority
        style={{ height: "auto", width: "169px" }}
      />

      <div className=" flex gap-5 justify-center items-center">
        <div
          className={" cursor-pointer"}
          onClick={() => {
            theme === "dark" ? setTheme("light") : setTheme("dark");
          }}
        >
          <Sun
            className={cn(
              "h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 dark:hidden "
            )}
          />
          <Moon
            className={cn(
              " h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 hidden dark:block"
            )}
          />
        </div>
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
              className=" px-5 py-1 cursor-pointer dark:hover:bg-[#282727] hover:bg-[#f7f7f7]"
              onClick={async () => {
                await logout();
              }}
            >
              Đăng xuất
            </div>
          </PopoverContent>
        </Popover>
      </div>

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
