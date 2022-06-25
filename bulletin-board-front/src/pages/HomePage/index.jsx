import React, {useCallback, useEffect} from "react";
import {Link} from "react-router-dom";
import {ModalProvider} from "../../context/ModalContext";
import DefaultLayout from "../../layouts/DefaultLayout";
import {useDispatch, useSelector} from "react-redux";
import {getPhotos} from "../../redux/features/posts/postSlice";

const HomePage = () => {
	
	const dispatch = useDispatch()
	const {photos} = useSelector(state => state.posts)
	
	
	console.log(photos)
	
	const getDeviceDataTotal = useCallback(() => {
		dispatch(getPhotos())
	}, []);
	
	useEffect(() => {
		getDeviceDataTotal()
	}, [getDeviceDataTotal]);
	
	return (
		<ModalProvider>
			<DefaultLayout>
				<div className="container">
					<div className="cards">
						{photos.advertisementList?.map((ad) => (
							<Link className="card" to={`cards/${ad.entityId}`}>
								<img src={ad.photo.urn} alt=""/>
								<div>
									<h1>{ad.name}</h1>
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
