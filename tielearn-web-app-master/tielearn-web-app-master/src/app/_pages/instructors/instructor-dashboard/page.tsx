import DashboardHome from "@/dashboard/instructor-dashboard/dashboard-home";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Instructor Home TieLearn  ",
};
const index = () => {
   return (
      <Wrapper>
         <DashboardHome />
      </Wrapper>
   )
}

export default index