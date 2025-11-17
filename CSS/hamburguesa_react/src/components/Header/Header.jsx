import { useState } from "react";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import styles from "./Header.module.css";
import logo from "/img/omnifood-logo.png";

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => setNavOpen((prev) => !prev);

  return (
    <header className={styles.header}>
      <a href="#">
        <img src={logo} alt="Omnifood logo" className={styles.logo} />
      </a>

      <nav className={`${styles.nav} ${navOpen && styles.navOpen}`}>
        <ul className={styles.navList}>
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

      <button
        className={styles.btnMobileNav}
        onClick={toggleNav}
        aria-label="Toggle navigation menu"
      >
        {navOpen ? (
          <IoCloseOutline className={styles.iconMobileNav} />
        ) : (
          <IoMenuOutline className={styles.iconMobileNav} />
        )}
      </button>
    </header>
  );
}
