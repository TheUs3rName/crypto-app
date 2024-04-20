import { RotatingLines } from "react-loader-spinner";
import { getCoinChart } from "../services/apiService";
import styles from "./TableCoin.module.css";
import { get_currency_symbol } from "../helpers/currencySymbol";
import TableRow from "./TableRow";

function TableCoin({ coins, isLoading, currency, setChart }) {
  return (
    <div className={styles.container}>
      {isLoading ? (
        <RotatingLines strokeColor="#3874ff" strokeWidth="2" />
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Name</th>
              <th>Price</th>
              <th>24 H</th>
              <th>Total Volume</th>
            </tr>
          </thead>
          <tbody>
            {coins.length &&
              coins.map((coin) => (
                <TableRow
                  key={coin.id}
                  coin={coin}
                  currency={currency}
                  setChart={setChart}
                />
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TableCoin;
