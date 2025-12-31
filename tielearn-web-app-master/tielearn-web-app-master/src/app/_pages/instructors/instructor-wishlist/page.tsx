import InstructorWishlist from "@/dashboard/instructor-dashboard/instructor-wishlist";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Instructor Wishlist TieLearn  ",
};
const index = () => {
   return (
      <Wrapper>
         <InstructorWishlist />
      </Wrapper>
   )
}

export default index