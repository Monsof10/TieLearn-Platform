import feature_data from "@/data/home-data/FeatureData"
import InjectableSvg from "@/hooks/InjectableSvg"

const Feature = ({ style }: any) => {
   return (
      <section className={`${style ? "features__area-three" : "features__area-two"} section-pt-120 section-pb-90`}>
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-6 col-lg-8">
                  <div className="section__title text-center mb-40">
                     <span className="sub-title">Nos Meilleures Fonctionnalités</span>
                     <h2 className="title">Atteignez Votre Objectif Avec TieLearn w</h2>
                     <p>quand un imprimeur inconnu prit une galère de type et la brouilla pour faire <br /> un livre spécimen qui a survécu non seulement cinq siècles</p>
                  </div>
               </div>
            </div>
            <div className="features__item-wrap">
               <div className="row justify-content-center">
                  {feature_data.filter((items) => items.page === "home_2").map((item) => (
                     <div key={item.id} className="col-lg-4 col-md-6">
                        <div className="features__item-two">
                           <div className="features__content-two">
                              <div className="content-top">
                                 <div className="features__icon-two">
                                    <InjectableSvg src={item.icon_2 ? item.icon_2 : ""} alt="img" className="injectable" />
                                 </div>
                                 <h2 className="title">{item.title}</h2>
                              </div>
                              <p>{item.desc}</p>
                           </div>
                           <div className="features__item-shape">
                              <InjectableSvg src="/assets/img/others/features_item_shape.svg" alt="img" className="injectable" />
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>
   )
}

export default Feature
