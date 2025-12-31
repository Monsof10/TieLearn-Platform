import InstructorSetting from "@/dashboard/instructor-dashboard/instructor-setting";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Instructor Setting TieLearn  ",
};
const index = () => {
   return (
      <Wrapper>
         <InstructorSetting />
      </Wrapper>
   )
}

export default index