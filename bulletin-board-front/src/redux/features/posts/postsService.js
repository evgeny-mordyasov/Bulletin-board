import axios from 'axios'

const getPhotos = async () => {
	
	const response = await axios.get('http://localhost:8090/api/v1/advertisements')
	
	return response.data
}

const getPhotoById = async (entityId) => {
	
	const response = await axios.get('http://localhost:8090/api/v1/advertisements/' + entityId)
	
	return response.data
}

const deletePhotoById = async (entityId) => {
	
	const response = await axios.delete('http://localhost:8090/api/v1/advertisements/' + entityId)
	
	return response.data
}

const createPhoto = async (entityId) => {
	
	const response = await axios.delete('http://localhost:8090/api/v1/advertisements/' + entityId)
	
	return response.data
}

const photoService = {
	getPhotos,
	getPhotoById,
	deletePhotoById,
}

export default photoService
