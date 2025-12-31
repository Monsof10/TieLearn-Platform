import InstructorProfile from "@/dashboard/instructor-dashboard/profile";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Instructor Profile TieLearn  ",
};
const index = () => {
  return (
    <Wrapper>
      <InstructorProfile />
    </Wrapper>
  )
}

export default index