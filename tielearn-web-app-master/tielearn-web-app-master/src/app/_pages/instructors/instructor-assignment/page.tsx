import InstructorAssignment from "@/dashboard/instructor-dashboard/instructor-assignment";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Instructor Assignment TieLearn  ",
};
const index = () => {
   return (
      <Wrapper>
         <InstructorAssignment />
      </Wrapper>
   )
}

export default index