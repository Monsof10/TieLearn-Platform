import StudentAttempts from "@/dashboard/student-dashboard/student-attempts";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Student Attempts TieLearn  ",
};
const index = () => {
   return (
      <Wrapper>
         <StudentAttempts />
      </Wrapper>
   )
}

export default index