import logo from "/img/omnifood-logo.png";
import styles from "./StickyHeader.module.css";

export default function StickyHeader() {
  return (
    <header className={styles.header}>
      <a href="#">
        <img src={logo} alt="Omnifood Logo" className={styles.logo} />
      </a>
      <nav className={styles.mainNav}>
        <ul className={styles.mainNavList}>
          <li>
            <a href="#">How it works</a>
          </li>
          <li>
            <a href="#">Meals</a>
          </li>
          <li>
            <a href="#">Testimonials</a>
          </li>
          <li>
            <a href="#">Pricing</a>
          </li>
          <li>
            <a href="#" className={styles.navCta}>
              Try for free
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
