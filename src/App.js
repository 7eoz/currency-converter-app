import React, { useEffect, useState } from 'react';
import CurrencyRow from './CurrencyRow';
import './App.css';
import axios from 'axios';

const API_KEY = '716b4e3f1c4e666c7941e800';
const BASE_URL = 'https://v6.exchangerate-api.com/v6/';
const ENDPOINT = '/latest/';
const URL = BASE_URL + API_KEY + ENDPOINT;

export default function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let fromAmount, toAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(async () => {
    const resp = await axios.get(URL + 'USD');
    const firstCurrency = Object.keys(resp.data.conversion_rates)[1];
    setCurrencyOptions([
      // resp.data.base_code,
      ...Object.keys(resp.data.conversion_rates)
    ]);
    setFromCurrency(resp.data.base_code);
    setToCurrency(firstCurrency);
    setExchangeRate(resp.data.conversion_rates[firstCurrency]);
  }, []);

  useEffect(async () => {
    if (fromCurrency !== null && toCurrency !== null) {
      const resp = await axios.get(URL + fromCurrency);
      setExchangeRate(resp.data.conversion_rates[toCurrency]);
    }
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(event) {
    setAmount(event.target.value);
    setAmountInFromCurrency(true);
  }
  function handleToAmountChange(event) {
    setAmount(event.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <>
      <h1>Convert</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={event => setFromCurrency(event.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />
      <div className="equals">=</div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={event => setToCurrency(event.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
    </>
  );
}
