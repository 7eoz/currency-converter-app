import React, { useEffect, useState } from 'react';
import CurrencyRow from './CurrencyRow';
import './App.css';
import axios from 'axios';

const API_KEY = '716b4e3f1c4e666c7941e800';
const BASE_URL = 'https://v6.exchangerate-api.com/v6/';
const URL = BASE_URL + +API_KEY + '/latest/USD';

export default function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);

  useEffect(async () => {
    const resp = await axios.get(
      `https://v6.exchangerate-api.com/v6/716b4e3f1c4e666c7941e800/latest/USD`
    );
    setCurrencyOptions([
      // resp.data.base_code,
      ...Object.keys(resp.data.conversion_rates)
    ]);
  }, []);

  return (
    <>
      <h1>Convert</h1>
      <CurrencyRow currencyOptions={currencyOptions} />
      <div className="equals">=</div>
      <CurrencyRow currencyOptions={currencyOptions} />
    </>
  );
}
