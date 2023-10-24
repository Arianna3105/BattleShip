import React from "react";
import PropTypes from "prop-types";
import styles from "./../style/Intro.module.css";
import Title from "./Title/Title";

const Intro = ({ setAppStatus }) => {
  const onSkipIntro = () => {
    setAppStatus("newGame");
  };

  return (
    <div className={styles.fade}>
      <section className={styles.starWarsIntro} onClick={onSkipIntro}>
        <div className={styles.crawl}>
          <div className={styles.title}>
            <Title />
          </div>
        </div>
        <button
          className={`${styles.startGameBtn} ${styles.starBtn}`}
          onClick={onSkipIntro}
        >
          <span className={styles.butTitl}> Welcome to Battleship!!!</span>
        </button>
      </section>
    </div>
  );
};

export default Intro;

Intro.propTypes = {
  setAppStatus: PropTypes.func.isRequired,
};
