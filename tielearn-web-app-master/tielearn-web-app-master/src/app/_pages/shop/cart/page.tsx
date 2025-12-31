import Cart from "@/components/inner-shop/cart";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Cart TieLearn  ",
};
const page = () => {
   return (
      <Wrapper>
         <Cart />
      </Wrapper>
   )
}

export default page