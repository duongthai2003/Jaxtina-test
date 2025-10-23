"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { LockKeyhole, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import Loading from "~/app/loading";
import { Button } from "~/components/ui/button";
import { auth } from "~/lib/firebaseConfig";
import { setCookie } from "~/lib/storage";

const signinForm = z.object({
  Email: z
    .string()
    .trim()
    .nonempty("Vui lòng nhập email")
    .email("Email không hợp lệ"),
  Password: z
    .string()
    .trim()
    .nonempty("Vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export type SigninInput = z.infer<typeof signinForm>;
function Login() {
  const router = useRouter();
  const [loginErrorMess, setLoginErrorMess] = useState<string | null>(null);
  const {
    handleSubmit,
    register,
    formState: { isLoading, isSubmitting, errors },
    getValues,
    watch,
  } = useForm<z.infer<typeof signinForm>>({
    resolver: zodResolver(signinForm),
  });

  async function onSubmit(data: z.infer<typeof signinForm>) {
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        data.Email,
        data.Password
      );
      setCookie({ name: "token", value: await res.user.getIdToken() });
      setCookie({ name: "refreshToken", value: res.user.refreshToken });
      setLoginErrorMess(null);
      router.push("/courses");
    } catch (err) {
      console.log(err);
      setLoginErrorMess("Lỗi email hoặc mật khẩu");
    }
  }
  useEffect(() => {
    if (loginErrorMess) setLoginErrorMess(null);
  }, [watch("Email"), watch("Password")]);

  return (
    <div className=" h-screen flex justify-center items-center">
      <div className=" relative w-[350px] bg-[#f9f9f9] border border-[#ccc] rounded-md py-5 px-6 flex flex-col justify-center items-center ">
        <Image
          src="/logo.png"
          alt="logo"
          width={100}
          height={100}
          priority
          style={{ height: "auto", width: "auto" }}
        />
        <p className=" text-[15px] mt-2 text-[#2e3293]">
          The Pioneer in Coaching 4 English Skills
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full mt-4 flex flex-col gap-3"
        >
          <div>
            <label
              htmlFor="Email"
              className="px-3 py-2 bg-white w-full rounded-md flex gap-3 items-center"
            >
              <Mail size={22} color="#2e3293" />
              <input
                id="Email"
                type="email"
                placeholder="Email"
                className="w-full text-[15px] text-[#5a5959] outline-none "
                {...register("Email")}
              />
            </label>
            {errors.Email && (
              <span className="text-[13px] text-red-500">
                {errors.Email.message}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="Password"
              className="px-3 py-2 bg-white w-full rounded-md flex gap-3 items-center"
            >
              <LockKeyhole size={22} color="#2e3293" />
              <input
                id="Password"
                type="password"
                placeholder="Mật khẩu"
                className="w-full text-[15px] text-[#5a5959] outline-none "
                {...register("Password")}
              />
            </label>
            {errors.Password && (
              <span className="text-[13px] text-red-500">
                {errors.Password.message}
              </span>
            )}
          </div>
          {loginErrorMess && (
            <span className="  text-[13px] text-red-500">{loginErrorMess}</span>
          )}
          <p className=" cursor-pointer text-[14px] underline text-[#2e3293] flex justify-end ">
            Quên mật khẩu?
          </p>

          <Button
            className=" select-none cursor-pointer mt-5 bg-[#ce1e29] hover:bg-[#d22631] text-white "
            type="submit"
            disabled={errors.Email || errors.Password ? true : false}
          >
            Đăng Nhập
          </Button>
          <p className="mt-1 text-center">
            Chưa có tài khoản ?{" "}
            <Link href={""} className=" text-[#2e3293]">
              Đăng ký ngay
            </Link>{" "}
          </p>
        </form>
        {isLoading ||
          (isSubmitting && (
            <div className=" absolute top-0 left-0 w-full h-full flex justify-center items-center">
              <Loading />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Login;
