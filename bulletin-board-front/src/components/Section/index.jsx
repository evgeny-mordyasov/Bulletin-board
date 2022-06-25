import React from "react";
import { ReactComponent as Logo } from "../../assets/img/logo.svg";
import styles from "./index.module.css";

const Section = () => {
  return (
    <section>
      <div className="container">
        <div className={styles.section__wrap__info}>
          <div className={styles.section__wrap__about__logo}>
            <Logo />
            <h3 className={styles.section__wrap__about__title}>
              Bulletin Board
            </h3>
          </div>
          <div className={styles.section__wrap__about__text}>
            <p className={styles.about__text}>
              Bulletin Board - сайт объявлений.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
