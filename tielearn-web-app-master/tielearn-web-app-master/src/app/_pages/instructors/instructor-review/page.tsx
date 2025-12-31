import InstructorReview from "@/dashboard/instructor-dashboard/instructor-review";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Instructor Review TieLearn  ",
};
const index = () => {
   return (
      <Wrapper>
         <InstructorReview />
      </Wrapper>
   )
}

export default index