import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";
import SubHeader1 from "./SubHeader1";
import SubHeader2 from "./SubHeader2";

export default function Header() {
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

      {isSticky ? <SubHeader2 /> : <SubHeader1 />}
    </header>
  );
}
