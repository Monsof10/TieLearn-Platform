import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne";
import ProductDetailsArea from "@/components/inner-shop/product-details/ProductDetailsArea";
import product_data from "@/data/inner-data/InnerCourseData";
import FooterOne from "@/layouts/footers/FooterOne";
import HeaderOne from "@/layouts/headers/HeaderOne";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Shop Details TieLearn  ",
};
const index = async ({ params }: { params: Promise<{ id: string[] }> }) => {

   const resolvedParams = await params;
   const products = product_data;
   const single_product = products.find((item) => Number(item.id) === Number(resolvedParams.id));

   return (
      <Wrapper>
         <HeaderOne />
         <main className="main-area fix">
            <BreadcrumbOne title="Course Details" sub_title="Course Details" />
            <ProductDetailsArea single_product={single_product} />
         </main>
         <FooterOne />
      </Wrapper>
   )
}

export default index