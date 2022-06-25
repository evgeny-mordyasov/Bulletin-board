import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import AdPage from "./AdPage";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useAuth } from "../hooks/useAuth";

const RouteComponent = () => {
  const { getValueFromLocalStorage } = useLocalStorage();

  const { isAuth, setAuth, setUser } = useAuth();

  useEffect(() => {
    const accessToken = getValueFromLocalStorage("accessToken");
    if (accessToken && accessToken !== "null") setAuth(true);
  }, [setAuth, getValueFromLocalStorage]);

  useEffect(() => {
    const user = getValueFromLocalStorage("user");
    if (user && user !== "null") setUser(user);
  }, [setUser, getValueFromLocalStorage]);

  console.log(isAuth, "isAuth");

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path=":id" element={<AdPage />} />
    </Routes>
  );
};

export default RouteComponent;
