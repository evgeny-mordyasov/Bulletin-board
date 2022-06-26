import React, {useEffect, useState} from 'react';
import {ModalProvider} from "../../context/ModalContext";
import DefaultLayout from "../../layouts/DefaultLayout";
import {getPhotoById, updatePhoto} from "../../redux/features/posts/postSlice";
import {useDispatch, useSelector} from "react-redux";

import styles from './index.module.css'
import {useNavigate, useParams} from "react-router-dom";
import {useLocalStorage} from "../../hooks/useLocalStorage";

export const UpdatePost = () => {
	const dispatch = useDispatch()
	const id = useParams()
	const {photo, isLoading, isError} = useSelector((state) => state.posts);
	
	const {getValueFromLocalStorage} = useLocalStorage();
	
	console.log(photo)
	
	const userId = getValueFromLocalStorage("userId");
	
	const [file, setFile] = useState(photo.advertisement?.photo?.urn)
	const navigate = useNavigate()
	
	console.log(file)
	
	useEffect(() => {
		dispatch(getPhotoById({entityId: id.id}))
	}, []);
	
	const [adData, setAdData] = useState({
		entityId: photo.advertisement?.entityId,
		clientId: userId,
		name: photo.advertisement?.name,
		region: photo.advertisement?.locality?.region?.name,
		subcategoryId: photo.advertisement?.subcategory?.id,
		description: photo.advertisement?.description,
		price: photo.advertisement?.price,
		locality: photo.advertisement?.locality?.id,
		street: photo.advertisement?.street?.id,
		houseNumber: photo.advertisement?.houseNumber,
	});
	
	const {entityId, clientId, name, subcategoryId, description, price, locality, street, houseNumber, region} = adData
	
	const onChange = (e) => {
		setAdData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}))
	}
	
	const onSubmit = (e) => {
		e.preventDefault();
		
		const adData = new FormData()
		
		adData.append('entityId', entityId)
		adData.append('clientId', clientId)
		adData.append('name', name)
		adData.append('subcategoryId', subcategoryId)
		adData.append('description', description)
		adData.append('price', price)
		adData.append('region', region)
		adData.append('locality', locality)
		adData.append('street', street)
		adData.append('houseNumber', houseNumber)
		adData.append('file', file)
		
		dispatch(updatePhoto(adData))
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



