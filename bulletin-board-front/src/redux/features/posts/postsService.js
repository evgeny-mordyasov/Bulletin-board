import axios from 'axios'

const getPhotos = async () => {
	
	const response = await axios.get('http://localhost:8090/api/v1/advertisements')
	
	return response.data
}

const getPhotoById = async (entityId) => {
	
	const response = await axios.get('http://localhost:8090/api/v1/advertisements/' + entityId)
	
	return response.data
}

const getSubcategory = async () => {
	
	const response = await axios.get('http://localhost:8090/api/v1/subcategories/')
	
	return response.data
}

const deletePhotoById = async (entityId) => {
	
	const response = await axios.delete('http://localhost:8090/api/v1/advertisements/' + entityId)
	
	return response.data
}

const createPhoto = async (adData) => {
	
	const response = await axios.post('http://localhost:8090/api/v1/advertisements/', adData)
	
	return response.data
}

const updatePhoto = async (adData) => {
	
	const response = await axios.post('http://localhost:8090/api/v1/advertisements/', adData)
	
	return response.data
}

const photoService = {
	getPhotos,
	getPhotoById,
	deletePhotoById,
	createPhoto,
	updatePhoto,
	getSubcategory,
}

export default photoService
