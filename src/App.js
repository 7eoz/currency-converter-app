import React, { useEffect, useState } from 'react';
import CurrencyRow from './CurrencyRow';
import './App.css';
import axios from 'axios';

const API_KEY = '716b4e3f1c4e666c7941e800';
const BASE_URL = 'https://v6.exchangerate-api.com/v6/';
const URL = BASE_URL + +API_KEY + '/latest/USD';

export default function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();

  useEffect(async () => {
    const resp = await axios.get(
      `https://v6.exchangerate-api.com/v6/716b4e3f1c4e666c7941e800/latest/USD`
    );
    const firstCurrency = Object.keys(resp.data.conversion_rates)[1];
    setCurrencyOptions([
      // resp.data.base_code,
      ...Object.keys(resp.data.conversion_rates)
    ]);
    setFromCurrency(resp.data.base_code);
    setToCurrency(firstCurrency);
  }, []);

  return (
    <>
      <h1>Convert</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={event => setFromCurrency(event.target.value)}
      />
      <div className="equals">=</div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={event => setToCurrency(event.target.value)}
      />
    </>
  );
}
