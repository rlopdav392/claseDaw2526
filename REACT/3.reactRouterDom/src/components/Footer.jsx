import clasesFooter from "./footer.module.css";
import SocialLinks from "./socialLinks/SocialLinks";
function Footer() {
  return (
    <footer className={`${clasesFooter.footer} ${clasesFooter["color-fondo"]}`}>
      <span> logo</span>
      <span> movidas</span>
      <SocialLinks />
    </footer>
  );
}

export default Footer;
