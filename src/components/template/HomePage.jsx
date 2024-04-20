import { useEffect, useState } from "react";
import { getCoinList } from "../services/apiService.js";
import TableCoin from "../modules/TableCoin.jsx";
import Pagination from "../modules/Pagination.jsx";
import Search from "../modules/Search.jsx";
import Chart from "../modules/Chart.jsx";
import Layout from "../../layouts/Layout.jsx";
import { getCoinChart } from "../services/apiService.js";

function HomePage() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(getCoinList(page, currency));
      const json = await resp.json();
      setCoins(json);
      setIsloading(false);
    };

    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [page, currency]);


  return (
    <Layout>
      <Search
        setCurrency={setCurrency}
        setIsloading={setIsloading}
        setChart={setChart}
      />
      <TableCoin
        coins={coins}
        isLoading={isLoading}
        currency={currency}
        setChart={setChart}
        
      />
      <Pagination page={page} setPage={setPage} setIsloading={setIsloading} />
      {!!chart && (
        <Chart chart={chart} setChart={setChart} currency={currency} />
      )}
    </Layout>
  );
}

export default HomePage;
