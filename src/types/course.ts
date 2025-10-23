interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  level: "S" | "Pres" | "TC" | "MTC";
  kindOfCourse: "IELTS" | "TOEIC" | "4SKILLS" | "VSTEP";
  totalLessons: number;
  progress: number;
  status?: "not-started" | "in-progress" | "completed";
  lessons: Lesson[];
}
