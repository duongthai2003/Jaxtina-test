import Image from "next/image";

function NotFoundIcon() {
  return (
    <div className=" flex flex-col justify-center items-center">
      <Image
        src="/notfound.png"
        alt="logo"
        width={200}
        height={200}
        priority
        // style={{ height: "auto", width: "auto" }}
      />
      <p className="text-[20px] text-center">NOT FOUND</p>
    </div>
  );
}

export default NotFoundIcon;
