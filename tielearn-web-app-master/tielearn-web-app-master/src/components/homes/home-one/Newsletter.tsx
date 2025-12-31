'use client';
import Image from 'next/image';

import newsletter_img1 from '@/assets/img/others/newsletter_img.png';
import newsletter_img2 from '@/assets/img/others/newsletter_shape01.png';
import newsletter_img3 from '@/assets/img/others/newsletter_shape02.png';
import newsletter_img4 from '@/assets/img/others/newsletter_shape03.png';

const Newsletter = () => {
  return (
    <section className="newsletter__area">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-4">
            <div className="newsletter__img-wrap">
              <Image src={newsletter_img1} alt="img" />
              <Image
                src={newsletter_img2}
                alt="img"
                data-aos="fade-up"
                data-aos-delay="400"
              />
              <Image
                src={newsletter_img3}
                alt="img"
                className="alltuchtopdown"
              />
            </div>
          </div>
          <div className="col-lg-8">
            <div className="newsletter__content">
              <h2 className="title">
                Restez <span>à Jour</span> sur Nos Derniers <br />{' '}
                <span>Cours & Programmes</span>
              </h2>
              <div className="newsletter__form">
                <form onSubmit={(e) => e.preventDefault()}>
                  <input type="email" placeholder="Tapez Votre E-Mail" />
                  <button type="submit" className="btn">
                    S’inscrire
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="newsletter__shape">
        <Image
          src={newsletter_img4}
          alt="img"
          data-aos="fade-left"
          data-aos-delay="400"
        />
      </div>
    </section>
  );
};

export default Newsletter;
