import React, {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import HomePage from "./HomePage";
import AdPage from "./AdPage";
import {useLocalStorage} from "../hooks/useLocalStorage";
import {useAuth} from "../hooks/useAuth";
import {AddPost} from "./AddPost";
import {UpdatePost} from "./UpdatePost";

const RouteComponent = () => {
	const {getValueFromLocalStorage} = useLocalStorage();
	
	const {isAuth, setAuth, setUser} = useAuth();
	
	useEffect(() => {
		const accessToken = getValueFromLocalStorage("accessToken");
		if (accessToken && accessToken !== "null") setAuth(true);
	}, [setAuth, getValueFromLocalStorage]);
	
	useEffect(() => {
		const user = getValueFromLocalStorage("user");
		if (user && user !== "null") setUser(user);
	}, [setUser, getValueFromLocalStorage]);
	
	return (
		<Routes>
			<Route path="/" element={<HomePage/>}/>
			<Route path="cards/:id" element={<AdPage/>}/>
			<Route path="add-post" element={<AddPost/>}/>
			<Route path="update-post/:id" element={<UpdatePost/>}/>
		</Routes>
	);
};

export default RouteComponent;
