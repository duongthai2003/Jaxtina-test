"use client";
import { useCourses, useGetAnCourse } from "~/hooks/useCourse";
import Image from "next/image";
import { use, useMemo, useState } from "react";
import { Check, CirclePlay, Copy, CopyCheck } from "lucide-react";
import Link from "next/link";
import { CourseDetailSkeleton } from "~/components/LoadingSkeleton";
import { cn } from "~/lib/utils";
import NotFoundIcon from "~/components/NotFoundIcon";
interface Props {
  params: Promise<{ id: string }>;
}
function CourseDetail({ params }: Props) {
  const { id } = use(params);
  const { loading, course } = useGetAnCourse(id);
  const [isCoppy, setIsCoppy] = useState(false);
  const courseUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/courses/${id}`
      : "";

  return (
    <div className="relative mt-5 px-0 md:px-3 lg:px-20">
      {!loading ? (
        <div>
          {course ? (
            <div className=" mb-16  ">
              <div className=" flex justify-center">
                <div className="overflow-hidden rounded-md relative   w-full h-[450px] ">
                  <Image
                    src={course?.thumbnail}
                    alt="thumbnail"
                    fill
                    priority
                    className="object-cover   "
                  />
                </div>
              </div>

              <div className="px-2 md:px-0">
                <div className=" flex justify-between items-start md:items-center mt-11 flex-col md:flex-row  ">
                  <h1 className="text-[20px] md:text-3xl  font-semibold text-center ">
                    {course.title}
                  </h1>
                  <div
                    className=" cursor-pointer flex gap-2 items-center border px-5 rounded-md min-h-11 hover:bg-[#e3d5d51a] mt-5 md:mt-0"
                    onClick={() => {
                      navigator.clipboard.writeText(courseUrl);
                      setIsCoppy(true);
                    }}
                  >
                    {isCoppy ? (
                      <CopyCheck color="#ce1e29" size={18} />
                    ) : (
                      <Copy color="#ce1e29" size={18} />
                    )}
                    <p>Coppy Link</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-3 items-center ">
                  <Check size={18} color="#ce1e29" />
                  <p>Mục tiêu: {course.description}</p>
                </div>
              </div>
              <div className="mt-7 px-2 md:px-0 max-w-[700px]">
                <div className=" flex justify-between items-center">
                  <h2 className=" text-xl font-semibold ">Nội dung khóa học</h2>{" "}
                  <p className=" text-[15px]  ">
                    {course.status === "not-started"
                      ? "Hãy bắt đầu"
                      : course.status === "completed"
                      ? "Đã hoàn thành"
                      : "Hoàn thành:"}
                    {course.progress > 1 && course.progress < 100 ? (
                      <span className=" ml-1 text-[#ce1e29] font-semibold">
                        {course.progress}%
                      </span>
                    ) : (
                      ""
                    )}
                  </p>
                </div>
                <div className=" text-[13px] mt-2 flex  items-center ">
                  <h3 className="pr-2 border-r dark:border-[#616161] border-[#bababa]">
                    Khóa:{" "}
                    <span className=" text-[#1E40AF] font-semibold">
                      {course.kindOfCourse}
                    </span>
                  </h3>
                  <p className="px-2 border-r dark:border-[#616161] border-[#bababa]">
                    Lớp:{" "}
                    <span className="text-[#1E40AF]   font-semibold">
                      {course.level}
                    </span>
                  </p>
                  <p className="pl-2 ">
                    {" "}
                    <span className=" text-[#1E40AF] font-semibold">
                      {course.totalLessons}
                    </span>{" "}
                    bài học
                  </p>
                </div>
                <div className=" mt-4 ">
                  {course.lessons.map((item, index) => {
                    return (
                      <Link
                        href={`./${id}/lessons/${item.id}`}
                        key={index}
                        className="mt-2 lg:mt-1 flex items-center justify-between px-2 md:px-4 border-b py-1 border-[#00000008] cursor-pointer rounded-[8px] dark:bg-[#ffffff1a] hover:bg-[#e3d5d51a]! gap-5"
                      >
                        <div>
                          <div className=" flex items-center gap-2">
                            <CirclePlay color="#ce1e29" size={14} />
                            <p className=" line-clamp-1">
                              {item.order}. {item.title}
                            </p>
                          </div>
                          <p className="ml-9 text-[13px] text-[#424040] dark:text-[#8d8d8d] line-clamp-1">
                            {item.description}
                          </p>
                        </div>
                        <div className=" flex items-center gap-2 md:gap-4">
                          <p>{item.duration}</p>
                          <div className="w-[15px]">
                            {item.status === "completed" && (
                              <Check size={15} color="#ce1e29" />
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className=" flex flex-col justify-center items-center h-[500px]">
              <NotFoundIcon />
            </div>
          )}
        </div>
      ) : (
        <CourseDetailSkeleton />
      )}
    </div>
  );
}

export default CourseDetail;
