import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ModalProvider } from "../../context/ModalContext";
import DefaultLayout from "../../layouts/DefaultLayout";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePhotoById,
  getPhotoById,
} from "../../redux/features/posts/postSlice";

import { useLocalStorage } from "../../hooks/useLocalStorage";
import { toast } from "react-toastify";

const AdPage = () => {
  const id = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { photo, isLoading, isError } = useSelector((state) => state.posts);

  const { getValueFromLocalStorage } = useLocalStorage();

  const clientId = photo.advertisement?.client.entityId;
  const userId = getValueFromLocalStorage("userId");
  const userRole = getValueFromLocalStorage("role");

  console.log(photo);
  useEffect(() => {
    dispatch(getPhotoById({ entityId: id.id }));
  }, []);

  if (isLoading) return <p>loading</p>;

  const onEdit = () => {
    if (Number(userId) === Number(clientId)) {
      navigate(`/update-post/${photo.advertisement?.entityId}`);
    } else {
      toast("У вас нет привелегий");
    }
  };

  const onDelete = () => {
    if (
      window.confirm("Удалить объявление?") &&
      (Number(userId) === Number(clientId) || userRole === "ADMIN")
    ) {
      dispatch(deletePhotoById({ entityId: id.id }));
      navigate("/");
    } else {
      toast("У вас нет привелегий");
    }
  };

  return (
    <ModalProvider>
      <DefaultLayout>
        <div className="container">
          <>
            <div className={styles.ad}>
              <div className={styles.image}>
                <img src={photo.advertisement?.photo?.urn} />
              </div>
              <div className={styles.info}>
                <div className={styles.name}>{photo.advertisement?.name}</div>
                <div className={styles.price}>
                  {photo.advertisement?.price} руб.
                </div>
                <div className={styles.date}>
                  {photo.advertisement?.createDate}
                </div>
                <div className={styles.description}>
                  {photo.advertisement?.description}
                </div>
              </div>
              <div className={styles.contacts}>
                <div className={styles.number}>
                  Телефон: {photo.advertisement?.client.phoneNumber}
                </div>
                <div className={styles.number}>
                  Имя: {photo.advertisement?.client.name}
                </div>
                <div className={styles.number}>
                  Адрес: {photo.advertisement?.locality?.region?.name},
                  {photo.advertisement?.locality?.name},
                  {photo.advertisement?.street?.name},
                  {photo.advertisement?.houseNumber}
                </div>
              </div>
              <div className={styles.buttons}>
                <div className={styles.edit} onClick={onEdit}>
                  Редактировать
                </div>
                <div className={styles.delete} onClick={onDelete}>
                  Удалить
                </div>
              </div>
            </div>
          </>
        </div>
      </DefaultLayout>
    </ModalProvider>
  );
};

export default AdPage;
