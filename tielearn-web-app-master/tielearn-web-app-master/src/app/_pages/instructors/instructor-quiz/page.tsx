import InstructorQuiz from "@/dashboard/instructor-dashboard/instructor-quiz";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Instructor Quiz TieLearn  ",
};
const index = () => {
   return (
      <Wrapper>
         <InstructorQuiz />
      </Wrapper>
   )
}

export default index