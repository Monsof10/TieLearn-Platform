'use client';
import Image from 'next/image';
import Link from 'next/link';
import VideoPopup from '@/modals/VideoPopup';
import { useState } from 'react';
import BtnArrow from '@/svg/BtnArrow';

import about_img1 from '@/assets/img/others/about_img.png';
import about_img2 from '@/assets/img/others/about_shape.svg';
import about_img3 from '@/assets/img/others/student_grp.png';

const About = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <section className="about-area tg-motion-effects section-py-120">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-6 col-md-9">
              <div className="about__images">
                <Image src={about_img1} alt="img" className="main-img" />
                <Image
                  src={about_img2}
                  alt="img"
                  className="shape alltuchtopdown"
                />

                <div
                  className="about__enrolled"
                  data-aos="fade-right"
                  data-aos-delay="200"
                >
                  <p className="title">Etudiants Internationaux</p>
                  <Image src={about_img3} alt="img" />
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="about__content">
                <div className="section__title">
                  <span className="sub-title">Découvrez Notre Univers</span>
                  <h2 className="title">
                    Des Cours de
                    <span className="position-relative title-shape-wrap">
                      <svg
                        x="0px"
                        y="0px"
                        preserveAspectRatio="none"
                        viewBox="0 0 209 59"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.74438 7.70565C69.7006 -1.18799 136.097 -2.38304 203.934 4.1205C207.178 4.48495 209.422 7.14626 208.933 10.0534C206.793 23.6481 205.415 36.5704 204.801 48.8204C204.756 51.3291 202.246 53.5582 199.213 53.7955C136.093 59.7623 74.1922 60.5985 13.5091 56.3043C10.5653 56.0924 7.84371 53.7277 7.42158 51.0325C5.20725 38.2627 2.76333 25.6511 0.0898448 13.1978C-0.465589 10.5873 1.61173 8.1379 4.73327 7.70565"
                          fill="currentcolor"
                        />
                      </svg>
                      Qualité
                    </span>
                    Réunis en Un Seul Endroit
                  </h2>
                </div>
                <p className="desc">
                  Profitez d’un environnement d’apprentissage collaboratif et
                  enrichissant avec des sessions en présentiel et en ligne
                  adaptées à tous les niveaux.
                </p>
                <ul className="about__info-list list-wrap">
                  <li className="about__info-list-item">
                    <i className="flaticon-angle-right"></i>
                    <p className="content">Formation Interactive et Pratique</p>
                  </li>
                  <li className="about__info-list-item">
                    <i className="flaticon-angle-right"></i>
                    <p className="content">
                      Certificat Agréé et Reconnu par l’État
                    </p>
                  </li>
                  <li className="about__info-list-item">
                    <i className="flaticon-angle-right"></i>
                    <p className="content">
                      Compétences Clés pour le Marché du Travail
                    </p>
                  </li>
                </ul>
                <div className="tg-button-wrap">
                  <Link href="/about-us" className="btn arrow-btn">
                    Plus d&apos;info <BtnArrow />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* video modal start */}
      <VideoPopup
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
        videoId={'Ml4XCF-JS0k'}
      />
      {/* video modal end */}
    </>
  );
};

export default About;
