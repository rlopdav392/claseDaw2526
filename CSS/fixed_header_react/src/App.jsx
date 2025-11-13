import FixedHeader from "./components/FixedHeader/FixedHeader";
import styles from "./App.module.css";

export default function App() {
  return (
    <>
      <FixedHeader />

      <main className={styles.main}>
        <section className={styles.sectionHero}>
          <h1>A healthy meal delivered to your door, every single day</h1>
          <p>
            The smart 365-days-per-year food subscription that will make you eat
            healthy again.
          </p>
        </section>

        <section className={styles.sectionOther}>
          <h2>Meals</h2>
          <p>Look, this section slides behind the header ✨</p>
        </section>

        <section className={styles.sectionOther}>
          <h2>Testimonials</h2>
          <p>See how it keeps scrolling under the header?</p>
        </section>
      </main>
    </>
  );
}
