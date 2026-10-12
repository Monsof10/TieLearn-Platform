import ContactForm from '@/forms/ContactForm';
import InjectableSvg from '@/hooks/InjectableSvg';
import BtnArrow from '@/svg/BtnArrow';
import Link from 'next/link';

const ContactArea = () => {
  return (
    <section className="contact-area section-py-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="contact-info-wrap">
              <ul className="list-wrap">
                <li>
                  <div className="icon">
                    <InjectableSvg
                      src="assets/img/icons/map.svg"
                      alt="img"
                      className="injectable"
                    />
                  </div>
                  <div className="content">
                    <h4 className="title">Adresse</h4>
                    <p>
                      Rue Marbella, Nabeul <br /> Tunisia
                    </p>
                  </div>
                </li>
                <li>
                  <div className="icon">
                    <InjectableSvg
                      src="assets/img/icons/contact_phone.svg"
                      alt="img"
                      className="injectable"
                    />
                  </div>
                  <div className="content">
                    <h4 className="title">Téléphone</h4>
                    <Link href="tel:0123456789">+216 51 001 673</Link>
                  </div>
                </li>
                <li>
                  <div className="icon">
                    <InjectableSvg
                      src="assets/img/icons/emial.svg"
                      alt="img"
                      className="injectable"
                    />
                  </div>
                  <div className="content">
                    <h4 className="title">E-mail</h4>
                    <Link href="mailto:info@gmail.com">
                      contact@TieLearn digital.com
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="contact-form-wrap">
              <h4 className="title">Envoyez-nous un message</h4>
              <p>
                Votre adresse e-mail ne sera pas publiée. Les champs
                obligatoires sont marqués d&apos;un *
              </p>
              <ContactForm />
              <p className="ajax-response mb-0"></p>
            </div>
          </div>
        </div>
        <div className="contact-map">
          <iframe
            src="https://maps.google.com/maps?q=36.452332,10.733818&t=&z=15&ie=UTF8&iwloc=&output=embed"
            style={{ border: '0' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactArea;
