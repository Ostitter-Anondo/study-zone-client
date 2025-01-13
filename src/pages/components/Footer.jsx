import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import study from "../../assets/study.png"

const Footer = () => {
  return (
    <footer className="footer bg-neutral text-neutral-content items-center p-4">
      <aside className="grid-flow-col items-center">
        <img src={study} alt="gamerdude" className="size-20" />
        <p>Copyright © {new Date().getFullYear()} - All right reserved StudyZone Holdings Inc.</p>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end text-2xl">
        <a href="https://github.com/Ostitter-Anondo" target="_blank">
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/jawad-ibn-mamoon/" target="_blank">
          <FaLinkedin />
        </a>
        <a href="https://www.facebook.com/ostitter.anondo" target="_blank">
          <FaFacebook />
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
