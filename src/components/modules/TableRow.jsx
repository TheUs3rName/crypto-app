import styles from "./TableRow.module.css";
import { get_currency_symbol } from "../helpers/currencySymbol";
import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";
import { getCoinChart } from "../services/apiService";

function TableRow({ coin, currency, setChart }) {
  const chartHandler = async () => {
    const resp = await fetch(getCoinChart(coin.id, currency));
    const json = await resp.json();
    setChart({ ...json, coin });
  };
  return (
    <tr key={coin.id}>
      <td>
        <div className={styles.symbol} onClick={chartHandler}>
          <img src={coin.image} alt={coin.name} />
          <span>{coin.symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{coin.name}</td>
      <td>
        {get_currency_symbol(currency)} {coin.current_price.toLocaleString()}
      </td>
      <td
        className={
          coin.price_change_percentage_24h > 0 ? styles.success : styles.error
        }
      >
        {coin.price_change_percentage_24h.toFixed(2)} %
      </td>
      <td>
        {get_currency_symbol(currency)} {coin.total_volume.toLocaleString()}
      </td>
      <td>
        <img
          src={coin.price_change_percentage_24h > 0 ? chartUp : chartDown}
          alt={coin.name}
        />
      </td>
    </tr>
  );
}

export default TableRow;
