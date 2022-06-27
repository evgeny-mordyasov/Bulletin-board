import React from "react";
import { Link } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import { ReactComponent as Logo } from "../../assets/img/logo.svg";
import { useAuth } from "../../hooks/useAuth";
import styles from "./index.module.css";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Search from "../Search";

const Header = () => {
  const { open } = useModal();

  const { getValueFromLocalStorage } = useLocalStorage();

  const userName = getValueFromLocalStorage("user");

  const { isAuth } = useAuth();

  const handleCreateAd = () => {
    if (isAuth) console.log("валим ребята)");
    else open();
  };

  return (
    <header>
      <div className="container">
        <div className={styles.header__wrap}>
          <div className={styles.header__wrap__left}>
            <Link className={styles.header__wrap__link} to={"/"}>
              <Logo />
              <div className={styles.header__wrap__title}>Bulletin Board</div>
            </Link>
            {/* <nav className={styles.header__wrap__nav}>
              <div className={styles.header__wrap__left__category}>Авто</div>
              <div className={styles.header__wrap__left__category}>
                Недвижимость
              </div>
              <div className={styles.header__wrap__left__category}>Работа</div>
            </nav> */}
          </div>
          <div className={styles.header__wrap__right}>
            <div className={styles.header__wrap__right__buttons}>
              {!isAuth ? (
                <div
                  className={styles.header__wrap__right__buttons__registration}
                  onClick={() => open()}
                >
                  Вход и регистрация
                </div>
              ) : (
                <div
                  className={styles.header__wrap__right__buttons__registration}
                >
                  {userName}
                </div>
              )}
              <Link className={styles.link} to="/add-post">
                <div
                  className={styles.header__wrap__right__buttons__ad}
                  onClick={handleCreateAd}
                >
                  Подать объявление
                </div>
              </Link>
            </div>
          </div>
        </div>
        <Search />
      </div>
    </header>
  );
};

export default Header;
