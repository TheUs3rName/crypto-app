const CURRENCY_SYMBOL = { usd: "$", eur: "€", jpy: "¥" };

const get_currency_symbol = (name) => CURRENCY_SYMBOL[name];

export { get_currency_symbol };
