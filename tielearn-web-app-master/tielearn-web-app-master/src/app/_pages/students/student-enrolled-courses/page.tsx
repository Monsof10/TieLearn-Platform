import StudentEnrolledCourses from "@/dashboard/student-dashboard/student-enrolled-courses";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Student Dashboard TieLearn  ",
};
const index = () => {
   return (
      <Wrapper>
         <StudentEnrolledCourses />
      </Wrapper>
   )
}

export default index