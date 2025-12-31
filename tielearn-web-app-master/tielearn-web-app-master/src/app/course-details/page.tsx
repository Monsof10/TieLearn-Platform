import CourseDetails from "@/components/courses/course-details";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Course Details TieLearn  ",
};
const page = () => {
   return (
      <Wrapper>
         <CourseDetails />
      </Wrapper>
   )
}

export default page