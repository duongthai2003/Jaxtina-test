import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import Header from "~/components/header";

export default function CourseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <header>
        <Header />
      </header>
      <div className=" m-auto container px-3 lg:px-0  ">{children}</div>
      <footer>
        <div className=" gap-0 md:gap-5 flex  justify-between items-center md:items-start flex-col md:flex-row py-5 px-5 md:px-9 lg:px-[120px] pb-10 ">
          <div className=" flex flex-col items-center md:items-start ju gap-3 max-w-[250px]  lg:max-w-[350px]">
            <Image
              src="/logo.png"
              alt="logo"
              width={100}
              height={100}
              priority
              className=" object-cover"
            />
            <div>
              <p className=" font-bold">Văn phòng tại Việt Nam: </p>
              <p className=" mt-2 hover:text-[#ce1e29]">
                Biệt thự A01 - Lô 80 An Vượng Villa, Khu đô thị Dương Nội, Hà
                Đông, Hà Nội
              </p>
            </div>
          </div>
          <div className="mt-3 md:mt-0">
            <p className=" font-bold">Thông tin chính sách</p>
            <div className=" text-[#757575] mt-3 md:mt-6">
              <p className=" hover:text-[#ce1e29]">
                {" "}
                Chính sách bảo mật thông tin
              </p>
              <p className=" hover:text-[#ce1e29]">
                Chính sách bảo lưu, học lại
              </p>
              <p className=" hover:text-[#ce1e29]">Chính sách thanh toán</p>
              <p className=" hover:text-[#ce1e29]">
                Chính sách hợp tác đào tạo
              </p>
            </div>
          </div>
          <div className="mt-3 md:mt-0">
            <p className=" font-bold  ">Thông tin liên hệ</p>
            <div className=" text-[#757575] mt-2 flex items-center gap-2">
              <Mail color="#ce1e29" size={18} />
              <p>
                <span className="mr-1 font-bold text-black dark:text-white">
                  Email:{" "}
                </span>
                <span className=" hover:text-[#ce1e29]">
                  support@jaxtina.com
                </span>
              </p>
            </div>
            <div className=" text-[#757575] mt-2  flex items-center gap-2">
              <Phone color="#ce1e29" size={18} />
              <p>
                <span className="mr-1 font-bold text-black dark:text-white">
                  Phone:{" "}
                </span>
                <span className=" hover:text-[#ce1e29]">+1900 63 65 64</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
