import React, {useEffect, useState} from 'react';
import {ModalProvider} from "../../context/ModalContext";
import DefaultLayout from "../../layouts/DefaultLayout";
import {createPhoto, getSubcategories} from "../../redux/features/posts/postSlice";
import {useDispatch, useSelector} from "react-redux";

import styles from './index.module.css'
import {useNavigate} from "react-router-dom";
import {useLocalStorage} from "../../hooks/useLocalStorage";

export const AddPost = () => {
	const dispatch = useDispatch()
	
	const [file, setFile] = useState(null)
	const navigate = useNavigate()
	
	const {getValueFromLocalStorage} = useLocalStorage();
	
	
	const userId = getValueFromLocalStorage("userId");
	
	const [adData, setAdData] = useState({
		entityId: 0,
		clientId: userId,
		name: "",
		subcategoryId: "",
		description: "",
		price: '',
		region: "",
		locality: "",
		street: "",
		houseNumber: "",
	});
	
	const {entityId, clientId, name, subcategoryId, description, price, locality, street, houseNumber, region} = adData
	
	const onChange = (e) => {
		setAdData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}))
	}
	
	useEffect(() => {
		dispatch(getSubcategories())
	}, []);
	
	
	console.log(name, 'name')
	
	const onSubmit = (e) => {
		e.preventDefault();
		
		const adData = new FormData()
		
		adData.append('entityId', entityId)
		adData.append('clientId', clientId)
		adData.append('name', name)
		adData.append('subcategoryId', subcategoryId)
		adData.append('description', description)
		adData.append('price', price)
		adData.append('locality', locality)
		adData.append('region', region)
		adData.append('street', street)
		adData.append('houseNumber', houseNumber)
		adData.append('file', file)
		
		dispatch(createPhoto(adData))
		navigate('/')
	}
	
	return (
		<ModalProvider>
			<DefaultLayout>
				<div className="container">
					<form action="" onSubmit={onSubmit} className={styles.addPost}>
						
						<label htmlFor="">name</label>
						<input type="text" value={name} name="name" onChange={onChange}/>
						
						<label htmlFor="">subcategoryId</label>
						<input type="text" value={subcategoryId} name="subcategoryId" onChange={onChange}/>
						
						<label htmlFor="">description</label>
						<input type="text" value={description} name="description" onChange={onChange}/>
						
						<label htmlFor="">price</label>
						<input type="text" value={price} name="price" onChange={onChange}/>
						
						<label htmlFor="">region</label>
						<input type="text" value={region} name="region" onChange={onChange}/>
						
						<label htmlFor="">locality</label>
						<input type="text" value={locality} name="locality" onChange={onChange}/>
						
						<label htmlFor="">street</label>
						<input type="text" value={street} name="street" onChange={onChange}/>
						
						<label htmlFor="">houseNumber</label>
						<input type="text" value={houseNumber} name="houseNumber" onChange={onChange}/>
						
						<label htmlFor="">file</label>
						<input type="file" name="file" onChange={e => setFile(e.target.files[0])}/>
						<button>submit</button>
					</form>
				</div>
			</DefaultLayout>
		</ModalProvider>
	);
};



