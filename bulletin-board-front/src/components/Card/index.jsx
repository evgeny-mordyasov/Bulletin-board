import React, {useEffect} from "react";
import styles from "./index.module.css";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getPhoto} from "../../redux/features/posts/postSlice";

const Card = ({image, name, price, locality, date, onClick}) => {

	
	return (
		<div className={styles.card}>
			<div className={styles.image}>
				<img src={image}/>
			</div>
			<div className={styles.info}>
				<div className={styles.name}>{name}</div>
				<div className={styles.price}>{price} руб.</div>
				<div className={styles.locality}>{locality}</div>
				<div className={styles.date}>{date}</div>
			</div>
		</div>
	);
};

export default Card;
