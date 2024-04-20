const BASE_URL = "https://api.coingecko.com/api/v3";
const API_KEY = "CG-eWsdKmJWECjYQF1zj3H2CiQD";

function getCoinList(page, price) {
  return `${BASE_URL}/coins/markets?vs_currency=${price}&order=market_cap_desc&per_page=20&page=${page}&sparkline=false&locale=en&x_cg_demo_api_key=${API_KEY}`;
}

function searchCoin(query) {
  return `${BASE_URL}/search?query=${query}&x_cg_demo_api_key=${API_KEY}`;
}

function getCoinChart(coin, currency) {
  return `${BASE_URL}/coins/${coin}/market_chart?vs_currency=${currency}&days=7&precision=3&x_cg_demo_api_key=${API_KEY}`;
}

export { getCoinList, searchCoin, getCoinChart };
