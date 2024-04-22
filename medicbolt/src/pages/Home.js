import React from "react";
import "./Pages.css";
import Hero from "../components/Hero";
import "./Pages.css";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="home" id="home">
        <Hero />
        <div className="pages" id="about" style={{ paddingTop: "15em" }}>
          <h2>MedicBolt?</h2>
          <div className="about__text">
            <p>
              MedicBolt laboratory and medical equipment is a leading company
              specializing in the sales, supply, installation, and maintainance
              of medical and laboratory equipment. MedicBolt is strongly
              commited to quality and customer satisfaction. We provide
              solutions to{" "}
              <span className="highlight">Healthcare Facilities</span>,{" "}
              <span className="highlight">Research Institutions</span> and{" "}
              <span className="highlight">Laboratories</span>
            </p>
            <div className="sub__section">
              <h3>Sales</h3>
              <p>
                {" "}
                At Medicbolt laboratory and medical equipment we offer a wide
                range of medical and laboratory equipment sourced from reputable
                manufacturers and suppliers. Our sales team consists of
                knowledgeable professionals who understand the unique
                requirements of the healthcare industry. They work closely with
                clients to assess their specific needs and provide tailored
                equipment solutions. Whether it's diagnostic equipment, surgical
                instruments, imaging devices, or laboratory apparatus, we ensure
                that our customers have access to cutting-edge technology and
                reliable products.
              </p>
            </div>
            <div className="sub__section">
              <h3>Supply</h3>
              <p>
                {" "}
                We maintain strong relationships with trusted suppliers to
                ensure a steady and diverse inventory of medical and laboratory
                equipment. Our supply chain management team ensures timely
                delivery and efficient logistics, minimizing any disruptions to
                our clients' operations. We prioritize the procurement of
                high-quality, certified equipment that adheres to industry
                standards and regulatory requirements.
              </p>
            </div>
            <div className="sub__section">
              <h3>Installation</h3>
              <p>
                {" "}
                Our experienced technicians and engineers are skilled in the
                installation of medical and laboratory equipment. They follow
                strict protocols and guidelines to ensure proper setup and
                integration of the equipment within the facility. We understand
                the critical nature of accurate installation, as it directly
                impacts the equipment's performance, safety, and longevity. Our
                team works closely with clients to minimize downtime and
                disruptions during the installation process, ensuring a smooth
                transition.
              </p>
            </div>
            <div className="sub__section">
              <h3>Maintenance</h3>
              <p>
                {" "}
                To ensure optimal performance and longevity of the equipment, we
                offer comprehensive maintenance services. Our technicians are
                trained to perform routine inspections, preventive maintenance,
                and repairs. We understand the importance of regular servicing
                to minimize downtime, extend the lifespan of the equipment, and
                ensure accurate results. We offer flexible maintenance plans
                tailored to our clients' needs, helping them maximize the value
                of their investment and minimize unexpected breakdowns.
              </p>
            </div>
            <div className="summary">
              <p>
                {" "}
                In summary, Medicbolt laboratory and medical equipment is a
                reliable partner for healthcare facilities, research
                institutions, and laboratories, providing sales, supply,
                installation, and maintenance services for medical and
                laboratory equipment. Our commitment to quality, customer
                satisfaction, and technical expertise sets us apart as a trusted
                provider in the industry.
              </p>
            </div>
          </div>
        </div>
        <div className="pages contact" id="contact">
          <h2>Contact</h2>
          <div className="contact_box">
            <h3>Get in touch</h3>
            <div className="contact__card">
              <i className="fa-solid fa-phone fa-2xl fa"></i>
              <Link className="link" to="tel:+2347062642542">
                <p>+2347062642542</p>
              </Link>
              <Link className="link" to="tel:+2347087000600">
                <p>+2347087000600</p>
              </Link>
            </div>
            <div className="contact__card">
              <i className="fa-brands fa-whatsapp fa-2xl fa"></i>
              <Link className="link" to="https://wa.me/+2347062642542">
                <p>Message us on WhatsApp</p>
              </Link>
            </div>
          </div>
          <div className="contact__box2">
            <div className="contact__card">
              <i class="fa-regular fa-envelope fa-lg fa"></i>
              <Link to="mailto:Medicbolt001@gmail.com">
                <p style={{ textAlign: "center" }}> Send us an Email</p>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
