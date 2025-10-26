"use client";
import { Check, ChevronLeft, CircleChevronDown } from "lucide-react";
import Link from "next/link";
import { use, useMemo } from "react";
import { LessionSkeleton } from "~/components/LoadingSkeleton";
import { useCourses } from "~/hooks/useCourse";
interface Props {
  params: Promise<{ id: string; lessonId: string }>;
}
function Lession({ params }: Props) {
  const { id, lessonId } = use(params);

  const { courses, loading } = useCourses();
  const lesson = useMemo(() => {
    const course = courses.find((item) => item.id === id);
    if (course && course.lessons) {
      return course.lessons.find((l) => l.id === lessonId);
    }
    return undefined;
  }, [id, lessonId, courses]);

  return (
    <div className=" my-7 px-0 md:px-3 lg:px-10">
      {lesson ? (
        <div>
          <Link
            href={`/courses/${id}`}
            className=" w-fit bg-[#ebebeb] flex justify-center items-center cursor-pointer px-3 py-1 rounded-[8px]  min-h-11 text-sm dark:bg-[#ffffff1a]  dark:hover:bg-[#e3d5d51a] hover:bg-[#d5d5d5a8]"
          >
            <ChevronLeft size={18} /> <span>Quay lại</span>
          </Link>
          <div className=" mt-3 flex justify-center h-auto md:h-[450px] bg-black">
            <video
              className="w-full"
              controls
              src="/video.mp4"
              poster="/bannerVideo.jpg"
            ></video>
          </div>
          <div className=" mt-10 px-3 md:px-8">
            <div className=" flex justify-between items-start md:items-center flex-col md:flex-row ">
              <h2 className=" text-[20px] md:text-xl font-semibold ">
                Bài {lesson.order}. {lesson.title}
              </h2>
              <div className=" bg-[#ebebeb] flex justify-center items-center cursor-pointer px-5 py-2 rounded-[8px] gap-2 min-h-11 text-sm dark:bg-[#ffffff1a]  dark:hover:bg-[#e3d5d51a] hover:bg-[#d5d5d5a8] mt-5 md:mt-0  ">
                <CircleChevronDown size={18} />{" "}
                <p>
                  Tiếp tục tại: <strong>2:23</strong>
                </p>
              </div>
            </div>
            <div className="mt-4 flex  md:gap-2 items-start md:items-center flex-col md:flex-row">
              <div className=" flex gap-1 items-center">
                <Check size={18} color="#ce1e29" />
                <p>Mục tiêu:</p>
              </div>
              <p className=" ml-5 md:ml-0">{lesson.description}</p>
            </div>
          </div>
        </div>
      ) : (
        <LessionSkeleton />
      )}
    </div>
  );
}

export default Lession;
