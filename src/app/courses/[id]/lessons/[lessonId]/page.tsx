"use client";
import { Check, ChevronLeft, CircleChevronDown } from "lucide-react";
import Link from "next/link";
import { use, useEffect, useMemo, useRef, useState } from "react";
import { LessonSkeleton } from "~/components/LoadingSkeleton";
import NotFoundIcon from "~/components/NotFoundIcon";

import {
  useCourses,
  useGetAnCourse,
  useUpdateAnCourse,
} from "~/hooks/useCourse";
import { LessonStatus } from "~/lib/constants";

interface Props {
  params: Promise<{ id: string; lessonId: string }>;
}
function Lesson({ params }: Props) {
  const { id, lessonId } = use(params);
  const { loading, course } = useGetAnCourse(id);
  const { updateCourse } = useUpdateAnCourse();
  const [videoCurrentTime, setVideoCurrentTime] = useState<string>("00:00");

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const lesson = useMemo(() => {
    if (course && course.lessons) {
      return course.lessons.find((l) => l.id === lessonId);
    }
    return undefined;
  }, [id, lessonId, course]);

  useEffect(() => {
    if (!course) return;
    if (lesson && lesson.status !== LessonStatus[2]) {
      const listLessons =
        course &&
        course?.lessons.map((item) =>
          item.id === lessonId ? { ...item, status: LessonStatus[2] } : item
        );
      const progress =
        ((course.totalLessonsCompleted + 1) / course.totalLessons) * 100;

      updateCourse(id, {
        totalLessonsCompleted: course.totalLessonsCompleted + 1,
        progress: progress,
        status: progress === 100 ? "completed" : "in-progress",
        lessons: listLessons as Lesson[],
      });
    }
  }, [lesson]);

  return (
    <div className=" my-7 px-0 md:px-3 lg:px-10">
      {!loading ? (
        <div>
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
                  ref={videoRef}
                  controls
                  src="/video.mp4"
                  poster="/bannerVideo.jpg"
                  onTimeUpdate={() => {
                    const time = videoRef.current?.currentTime || 0;
                    const minutes = Math.floor(time / 60);
                    const seconds = Math.floor(time % 60);
                    const formatted = `${minutes
                      .toString()
                      .padStart(2, "0")}:${seconds
                      .toString()
                      .padStart(2, "0")}`;
                    setVideoCurrentTime(formatted);
                  }}
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
                      Tiếp tục tại: <strong>{videoCurrentTime}</strong>
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
            <div className=" flex flex-col justify-center items-center h-[500px]">
              <NotFoundIcon />
            </div>
          )}
        </div>
      ) : (
        <LessonSkeleton />
      )}
    </div>
  );
}

export default Lesson;
