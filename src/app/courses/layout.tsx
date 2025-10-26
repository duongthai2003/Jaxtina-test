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
    </div>
  );
}
