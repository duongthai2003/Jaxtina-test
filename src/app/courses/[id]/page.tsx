"use client";
import { useCourses } from "~/hooks/useCourse";
import Image from "next/image";
import { use, useMemo } from "react";
import { Check, CirclePlay } from "lucide-react";
import Link from "next/link";
import Loading from "~/app/loading";
interface Props {
  params: Promise<{ id: string }>;
}
function CourseDetail({ params }: Props) {
  const { courses, loading } = useCourses();
  const { id } = use(params);
  console.log(id);
  const course = useMemo(() => {
    console.log(courses);
    return courses.find((item) => {
      return item.id === id;
    });
  }, [id, courses]);

  return (
    <div className="min-h-screen relative">
      {course ? (
        <div className="mt-5 mb-14  ">
          <div className=" flex justify-center">
            <div className="overflow-hidden rounded-md relative   w-full h-[450px] ">
              <Image
                src={course?.thumbnail}
                alt="thumbnail"
                fill
                className="object-cover   "
              />
            </div>
          </div>

          <div>
            <h1 className=" text-3xl mt-11 font-semibold text-center ">
              {course.title}
            </h1>
            <div className="mt-4 flex gap-3 items-center">
              <Check size={18} color="#ce1e29" />
              <p>Mục tiêu: {course.description}</p>
            </div>
          </div>
          <div className="mt-5">
            <h2 className=" text-xl font-semibold ">Nội dung khóa học</h2>
            <div className=" text-[13px] mt-2 flex  items-center ">
              <h3 className="pr-2 border-r border-white">
                Khóa:{" "}
                <span className=" text-[#1E40AF] font-semibold">
                  {course.kindOfCourse}
                </span>
              </h3>
              <p className="px-2 border-r border-white">
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
            <div className=" mt-4 max-w-[700px]">
              {course.lessons.map((item, index) => {
                return (
                  <Link
                    href={`./${id}/lessons/${item.id}`}
                    key={index}
                    className="mt-1 flex items-center justify-between px-4 border-b py-1 border-[#00000008] cursor-pointer rounded-[8px] dark:bg-[#ffffff1a] hover:bg-[#e3d5d51a]! gap-5"
                  >
                    <div>
                      <div className=" flex items-center gap-2">
                        <CirclePlay color="#ce1e29" size={14} />
                        <p className=" line-clamp-1">
                          {item.order}. {item.title}
                        </p>
                      </div>
                      <p className="ml-9 text-[13px] text-[#424040] line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                    <div className=" flex items-center gap-4">
                      <p>{item.duration}</p>
                      <div className="w-[22px]">
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
        <div className=" absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <Loading />
          <h1 className=" bg-green-600">WWWWW</h1>
        </div>
      )}
    </div>
  );
}

export default CourseDetail;
