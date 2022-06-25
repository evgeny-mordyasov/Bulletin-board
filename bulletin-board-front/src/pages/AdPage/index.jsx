import React, { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { toast } from "react-toastify";
import { ModalProvider } from "../../context/ModalContext";
import { getAd, getLocality, getUser, deleteAd } from "../../requests/ad";
import DefaultLayout from "../../layouts/DefaultLayout";
import styles from "./index.module.css";

const AdPage = () => {
  const [ad, setAd] = useState();
  const [locality, setLocality] = useState();
  const [user, setUser] = useState();

  const { id } = useParams();

  let navigate = useNavigate();

  const { getValueFromLocalStorage } = useLocalStorage();

  const fetchAd = useCallback(async () => {
    const { data } = await getAd(id);
    console.log("data", data);
    setAd(data.advertisementList[0]);
  }, [id]);

  const fetchLocality = useCallback(async (id) => {
    const { data } = await getLocality(id);
    console.log("data locality", data);
    setLocality(data.localityList[0]);
  }, []);

  const fetchUser = useCallback(async (id) => {
    const { data } = await getUser(id);
    console.log("data user", data);
    setUser(data.clientList[0]);
  }, []);

  const deleteAdv = useCallback(async () => {
    const userId = getValueFromLocalStorage("userId");
    if (userId === ad.clientId || user.role === "ADMIN") {
      const { data } = await deleteAd(id);
      console.log("delete data", data);
      setAd();
      navigate("/", { replace: true });
    } else {
      toast("У вас нет привелегий");
    }
  }, [id, navigate, getValueFromLocalStorage]);

  const aggregateData = useCallback(async () => {
    await fetchAd();
    const { localityId, clientId } = ad;
    if (localityId && clientId) {
      fetchUser(clientId);
      fetchLocality(localityId);
    }
  }, [fetchAd, fetchLocality, fetchUser, ad]);

  useEffect(() => {
    aggregateData();
  }, [aggregateData]);

  return (
    <ModalProvider>
      <DefaultLayout>
        <div className="container">
          {ad && locality && (
            <>
              <div className={styles.ad}>
                <div className={styles.image}>
                  <img src={`http://localhost:8090/api/v1/photos/${id}`} />
                </div>
                <div className={styles.info}>
                  <div className={styles.name}>{ad.name}</div>
                  <div className={styles.price}>{ad.price} руб.</div>
                  <div className={styles.locality}>{locality.name}</div>
                  <div className={styles.date}>{ad.createDate}</div>
                </div>
                <div className={styles.contacts}>
                  <div className={styles.firstName}>{user.name}</div>
                  <div className={styles.number}>{user.phoneNumber}</div>
                </div>
                <div className={styles.buttons}>
                  <div className={styles.edit}>Редактировать</div>
                  <div className={styles.delete} onClick={deleteAdv}>
                    Удалить
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </DefaultLayout>
    </ModalProvider>
  );
};

export default AdPage;
