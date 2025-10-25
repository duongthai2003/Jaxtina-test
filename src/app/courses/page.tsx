"use client";
import Image from "next/image";
import { useCourses } from "~/hooks/useCourse";

import PaginationPage from "../../components/paginaiton";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

function Courses() {
  const {
    loading,
    displayedCourses,
    totalPages,
    page,
    setPage,
    setFilter,
    setSearchValue,
  } = useCourses();

  return (
    <div className="mt-5">
      {loading ? (
        <SkeletonCourse />
      ) : (
        <div>
          <div className=" flex gap-2 ">
            <input
              className="px-2 py-1 outline-none border border-[#ccc] rounded-[8px] "
              type="text"
              placeholder="Tìm kiếm..."
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />

            <Select
              defaultValue="All"
              onValueChange={(value) => {
                setFilter(value);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="IELTS">IELTS</SelectItem>
                  <SelectItem value="TOEIC">TOEIC</SelectItem>
                  <SelectItem value="4SKILLS">4SKILLS</SelectItem>
                  <SelectItem value="VSTEP">VSTEP</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className=" grid grid-cols-4 ">
            {displayedCourses &&
              displayedCourses.map((item, index) => {
                return (
                  <div key={index} className="px-2 mt-4 ">
                    <div className="rounded-2xl h-full overflow-hidden bg-[#f7f7f7] cursor-pointer">
                      <div className=" overflow-hidden w-full aspect-video">
                        <Image
                          src={item.thumbnail}
                          alt="logo"
                          width={200}
                          height={200}
                          priority
                          className=" w-full h-full"
                        />
                      </div>
                      <div className="text-[14px] px-5 py-4">
                        <p className=" line-clamp-2 text-[#292929] text-[15px] font-semibold mb-1">
                          {item.title}
                        </p>
                        <p>
                          Level:{" "}
                          <span className=" text-[#1E40AF]">{item.level}</span>
                        </p>
                        <h3>
                          Loại khóa học:{" "}
                          <span className=" text-[#1E40AF]">
                            {item.kindOfCourse}
                          </span>
                        </h3>
                        <p>
                          Tổng số bài học:{" "}
                          <span className=" text-[#1E40AF]">
                            {item.totalLessons}
                          </span>
                        </p>

                        <p className="text-[#1E40AF]  line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className=" mt-5">
            <PaginationPage
              totalPages={totalPages}
              page={page}
              setPage={setPage}
            ></PaginationPage>
          </div>
        </div>
      )}
    </div>
  );
}

export default Courses;

function SkeletonCourse() {
  return (
    <div className=" grid grid-cols-4 ">
      {new Array(8).fill(1).map((_, index) => {
        return (
          <div key={index} className="px-2 mt-4  ">
            <Skeleton className="rounded-2xl h-60 overflow-hidden" />
          </div>
        );
      })}
    </div>
  );
}
