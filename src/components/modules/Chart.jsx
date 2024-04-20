import { useState } from "react";
import styles from "./Chart.module.css";
import { convertData } from "../helpers/convertData";
import {
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  Line,
  YAxis,
  XAxis,
  Legend,
  Tooltip,
} from "recharts";
import { get_currency_symbol } from "../helpers/currencySymbol";

function Chart({ chart, setChart, currency }) {
  const { coin } = chart;
  const [type, setType] = useState("prices");
  const closeHandler = (event) => {
    setChart(null);
  };

  const typeHandler = (event) => {
    const name = event.target.name;
    setType(name);
  };

  return (
    <div className={styles.container}>
      <span className={styles.cross} onClick={closeHandler}>
        X
      </span>
      <div className={styles.chart}>
        <div className={styles.title}>
          <img src={coin.image} alt={coin.name} />
          <p>{coin.name}</p>
        </div>
        <div className={styles.graph}>
          <ChartComponent data={convertData(chart, type)} type={type} />
        </div>
        <div className={styles.types}>
          <button
            className={type === "prices" ? styles.selected : null}
            name="prices"
            onClick={typeHandler}
          >
            Prices
          </button>
          <button
            className={type === "market_caps" ? styles.selected : null}
            name="market_caps"
            onClick={typeHandler}
          >
            Market Caps
          </button>
          <button
            className={type === "total_volumes" ? styles.selected : null}
            name="total_volumes"
            onClick={typeHandler}
          >
            Total Volumes
          </button>
        </div>
        <div className={styles.details}>
          <div>
            <p>Prices:</p>
            <span>
              {get_currency_symbol(currency)} {coin.current_price}
            </span>
          </div>
          <div>
            <p>ATH:</p>
            <span>
              {get_currency_symbol(currency)} {coin.ath}
            </span>
          </div>
          <div>
            <p>Market Cap:</p>
            <span>
              {get_currency_symbol(currency)} {coin.market_cap}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChartComponent({ data, type }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width="400px"
        height="400px"
        data={data}
        margin={{ top: 5, right: 10, bottom: 5, left: 90 }}
      >
        <CartesianGrid stroke="#404042" />
        <Line
          dot={null}
          type="monotone"
          dataKey={type}
          stroke="#3874ff"
          strokeWidth="2px"
        ></Line>
        <YAxis dataKey={type} domain={["auto", "auto"]} />
        <XAxis dataKey={"date"} hide />
        <Legend />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Chart;
