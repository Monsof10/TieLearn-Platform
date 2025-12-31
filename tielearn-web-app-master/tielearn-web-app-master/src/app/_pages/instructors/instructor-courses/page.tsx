import InstructorCourses from "@/dashboard/instructor-dashboard/instructor-courses";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Instructor Courses TieLearn  ",
};
const index = () => {
   return (
      <Wrapper>
         <InstructorCourses />
      </Wrapper>
   )
}

export default index