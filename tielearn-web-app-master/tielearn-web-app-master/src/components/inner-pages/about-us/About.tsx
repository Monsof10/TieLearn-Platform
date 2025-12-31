"use client"
import Image from "next/image"
import BtnArrow from "@/svg/BtnArrow"
import Link from "next/link"
import VideoPopup from "@/modals/VideoPopup"
import { useState } from "react"
import SvgAnimation from "@/hooks/SvgAnimation"

import about_img from "@/assets/img/others/inner_about_img.png"

const About = () => {

   const [isVideoOpen, setIsVideoOpen] = useState(false);
   const svgIconRef = SvgAnimation('/assets/img/others/inner_about_shape.svg');

   return (
      <>
         <section className="about-area-three section-py-120">
            <div className="container">
               <div className="row align-items-center justify-content-center">
                  <div className="col-lg-6 col-md-9">
                     <div className="about__images-three tg-svg" ref={svgIconRef}>
                        <Image src={about_img} alt="img" />
                        <span className="svg-icon" id="about-svg"></span>
                     </div>
                  </div>
                  
                  <div className="col-lg-6">
                     <div className="about__content-three">
                        <div className="section__title mb-10">
                           <span className="sub-title">En Savoir Plus Sur Nous</span>
                           <h2 className="title">
                              Permettre aux Étudiants d'Atteindre leur
                              <span className="position-relative title-shape-wrap">
                                 <svg x="0px" y="0px" preserveAspectRatio="none" viewBox="0 0 209 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.74438 7.70565C69.7006 -1.18799 136.097 -2.38304 203.934 4.1205C207.178 4.48495 209.422 7.14626 208.933 10.0534C206.793 23.6481 205.415 36.5704 204.801 48.8204C204.756 51.3291 202.246 53.5582 199.213 53.7955C136.093 59.7623 74.1922 60.5985 13.5091 56.3043C10.5653 56.0924 7.84371 53.7277 7.42158 51.0325C5.20725 38.2627 2.76333 25.6511 0.0898448 13.1978C-0.465589 10.5873 1.61173 8.1379 4.73327 7.70565" fill="currentcolor" />
                                 </svg>
                                 potentiel
                              </span>
                              pour le Prochain Défi de Niveau.
                           </h2>
                        </div>
                        <p className="desc">TieLearn  est une plateforme d'apprentissage en ligne dédiée à l'excellence dans les domaines du Design Graphique, du Marketing Digital, du Développement, de Microsoft Office et de l'UX/UI. Notre mission est de fournir des cours de qualité supérieure pour aider les professionnels et les étudiants à atteindre leurs objectifs de carrière.</p>
                        <ul className="about__info-list list-wrap">
                           <li className="about__info-list-item">
                              <i className="flaticon-angle-right"></i>
                              <p className="content">Les Instructeurs les Plus Experts du Monde</p>
                           </li>
                           <li className="about__info-list-item">
                              <i className="flaticon-angle-right"></i>
                              <p className="content">Accédez à Vos Cours Partout</p>
                           </li>
                           <li className="about__info-list-item">
                              <i className="flaticon-angle-right"></i>
                              <p className="content">Plan de Cours Flexible</p>
                           </li>
                        </ul>
                        <div className="tg-button-wrap">
                           <Link href="/contact" className="btn arrow-btn">Commencer l'Essai Gratuit <BtnArrow /></Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   )
}

export default About
