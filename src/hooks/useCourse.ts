import { useState, useEffect, useMemo } from "react";
import HTTP from "~/lib/api";

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("All");
  const [searchValue, setSearchValue] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 9;

  const getCourses = async () => {
    setLoading(true);
    try {
      const res = await HTTP.get("c/902d-1da2-4afe-8ae2");
      setCourses(res.data);
      return res.data;
    } catch (err: any) {
      setError(err.message || "Lỗi khi tải khóa học");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const displayedCourses = useMemo(() => {
    const end = page * itemsPerPage;
    if (searchValue.trim() !== "") {
      const filterCourse = courses.filter((item) => {
        return item.title.toLowerCase().includes(searchValue.toLowerCase());
      });

      // setTotalPages(Math.ceil(courses.length / itemsPerPage));
      return filterCourse.slice(0, end);
    }
    if (filter === "All") {
      setTotalPages(Math.ceil(courses.length / itemsPerPage));
      return courses.slice(0, end);
    } else {
      const filterCourse = courses.filter((item) => {
        return item.level === filter;
      });
      setTotalPages(Math.ceil(filterCourse.length / itemsPerPage));

      return filterCourse.slice(0, end);
    }

    //
  }, [page, courses, filter, searchValue]);

  return {
    courses,
    loading,
    error,
    displayedCourses,
    totalPages,
    page,
    setFilter,
    setPage,
    getCourses,
    setSearchValue,
  };
}
