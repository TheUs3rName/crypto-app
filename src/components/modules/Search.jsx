import { useEffect, useState } from "react";
import styles from "./Search.module.css";
import { searchCoin } from "../services/apiService.js";
import { RotatingLines } from "react-loader-spinner";

function Search({ setCurrency, setIsloading, setChart }) {
  const [search, setSearch] = useState("");
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      const resp = await fetch(searchCoin(search), {
        signal: controller.signal,
      });
      const json = await resp.json();
      if (json.coins) {
        setCoins(json.coins);
        setIsLoading(false);
      }
    };

    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }

    return () => {
      controller.abort();
    };
  }, [search]);

  const changeHandler = (event) => {
    const selected = event.target.value;
    setIsloading(true);
    setCurrency(selected);
  };

  const searchHandler = (event) => {
    setIsLoading(true);
    const query = event.target.value;
    setSearch(query);
  };

  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={searchHandler}
      />
      <select name="" id="" onChange={changeHandler}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>

      {(!!coins.length || isLoading) && (
        <div className={styles.searchResult}>
          {isLoading ? (
            <RotatingLines width="50px" strokeColor="#3874ff" strokeWidth="2" />
          ) : (
            <ul>
              {!!coins.length &&
                coins.map((coin) => (
                  <li key={coin.id}>
                    <img src={coin.thumb} alt={coin.name} />
                    <p>{coin.name}</p>
                  </li>
                ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
