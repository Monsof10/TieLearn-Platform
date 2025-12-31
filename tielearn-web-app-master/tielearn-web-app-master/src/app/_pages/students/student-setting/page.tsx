import StudentSetting from "@/dashboard/student-dashboard/student-setting";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Student Setting TieLearn  ",
};
const index = () => {
   return (
      <Wrapper>
         <StudentSetting />
      </Wrapper>
   )
}

export default index