import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const stickyRef = useRef(null);
  const sentinelRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Header</h1>

      <div ref={sentinelRef} className={styles.sentinel}></div>

      <div
        ref={stickyRef}
        className={`${styles.movida} ${isSticky && styles.movidaSticky}`}
      >
        Movida Element
      </div>
    </header>
  );
}
