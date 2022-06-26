import React, { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { ModalProvider } from "../../context/ModalContext";
import DefaultLayout from "../../layouts/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getPhotos } from "../../redux/features/posts/postSlice";
import styles from "./index.module.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const { photos } = useSelector((state) => state.posts);

  console.log(photos);

  const getDeviceDataTotal = useCallback(() => {
    dispatch(getPhotos());
  }, []);

  useEffect(() => {
    getDeviceDataTotal();
  }, [getDeviceDataTotal]);

  return (
    <ModalProvider>
      <DefaultLayout>
        <div className="container">
          <div className="cards">
            {photos.advertisementList?.map((ad) => (
              <Link
                className={styles.card}
                to={`cards/${ad.entityId}`}
                key={ad.entityId}
              >
                <img src={ad.photo.urn} alt="" />
                <div className={styles.info}>
                  <h3>{ad.name}</h3>
                  <h4 className={styles.price}>{ad.price} руб.</h4>
                  <div className={styles.locality}>{ad.locality?.name}</div>
                  <div className={styles.date}>{ad.createDate}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </DefaultLayout>
    </ModalProvider>
  );
};

export default HomePage;
