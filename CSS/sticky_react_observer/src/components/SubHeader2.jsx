import styles from "./SubHeader2.module.css";
function SubHeader2() {
  return (
    <div className={`${styles.subHeader2} ${styles.subHeader2Sticky}`}>
      SubHeader 2 sip sticky
    </div>
  );
}

export default SubHeader2;
