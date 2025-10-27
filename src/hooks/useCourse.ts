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
      const res = await HTTP.get("/courses");
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

      setTotalPages(Math.ceil(filterCourse.length / itemsPerPage));
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
export function useGetAnCourse(id: string) {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getAnCourse = async () => {
    setLoading(true);
    try {
      const res = await HTTP.get(`/courses/${id}`);
      setCourse(res.data);
      return res.data;
    } catch (err: any) {
      setError(err.message || "Lỗi khi tải khóa học");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAnCourse();
  }, [id]);

  return {
    course,
    loading,
    error,
    refetch: getAnCourse,
  };
}

export function useUpdateAnCourse() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateCourse = async (id: string, data: Partial<Course>) => {
    setLoading(true);
    setError(null);
    try {
      const res = await HTTP.put(`/courses/${id}`, data);
      return res.data;
    } catch (err: any) {
      setError(err.message || "Lỗi khi cập nhật khóa học");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateCourse,
    loading,
    error,
  };
}
