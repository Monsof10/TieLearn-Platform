import HeaderOne from "@/layouts/headers/HeaderOne"
import FooterOne from "@/layouts/footers/FooterOne"
import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne"
import About from "./About"
import BrandOne from "@/components/common/brands/BrandOne"
import Feature from "@/components/homes/home-two/Feature"
import Newsletter from "@/components/homes/home-two/Newsletter"
import Features from "@/components/homes/home-one/Features"
import Testimonial from "./Testimonial"

const AboutUs = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <BreadcrumbOne title="Qui Nous Sommes" sub_title="À Propos" />
            <About />
            <BrandOne />
            <Feature style={true} />
            <Features />
            <Testimonial />
         </main>
         <FooterOne />
      </>
   )
}

export default AboutUs
