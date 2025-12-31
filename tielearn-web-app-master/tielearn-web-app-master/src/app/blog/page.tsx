import Blog from "@/components/blogs/blog";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Blog TieLearn  ",
};
const index = () => {
   return (
      <Wrapper>
         <Blog />
      </Wrapper>
   )
}

export default index