import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";
import styles from "./index.module.css";
import { searchPost } from "../../redux/features/posts/postSlice";

const Search = () => {
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const debouncedValue = useDebounce(value, 1500);

  const dispatch = useDispatch();

  useEffect(() => {
    if (debouncedValue) {
      const query = `?search=${debouncedValue}`;
      setSearchParams(query);
      dispatch(searchPost(debouncedValue));
    }
  }, [setSearchParams, debouncedValue, dispatch]);

  console.log("params", searchParams);

  return (
    <div className={styles.header__search}>
      {/* <select name="" id="" className={styles.header__search__select__category}>
        <option selected value>
          Любая категория
        </option>
        <option value="1">Авто</option>
        <option value="2">Недвижимость</option>
        <option value="3">Личные вещи</option>
      </select> */}
      <input
        type="text"
        className={styles.header__search__input}
        placeholder="Поиск по объявлениям"
        value={value}
        name="name"
        onChange={(e) => setValue(e.target.value)}
      />
      {/* <select name="" id="" className={styles.header__search__select__city}>
        <option selected value>
          Любой город
        </option>
        <option value="1">Барнаул</option>
        <option value="2">Москва</option>
        <option value="3">Новосибирск</option>
      </select> */}
      <button className={styles.header__search__button}>Найти</button>
    </div>
  );
};

export default Search;
