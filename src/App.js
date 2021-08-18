import React, { useEffect } from 'react';
import CurrencyRow from './CurrencyRow';
import './App.css';
import axios from 'axios';

// const express = require('express');
// const app = express();
// const cors = require('cors');

// app.use(
//   cors({
//     origin: 'https://swapi.dev/api/'
//   })
// );

const API_KEY = 'a2a7cdfcc97ac77ffb9a523ce4d10113';
const BASE_URL = 'https://data.fixer.io/api/latest';
const URL = BASE_URL + '?access_key=' + API_KEY;

export default function App() {
  useEffect(async () => {
    const resp = await axios.get(
      `https://v6.exchangerate-api.com/v6/716b4e3f1c4e666c7941e800/latest/USD`
    );
    console.log(resp.data);
  }, []);

  return (
    <>
      <h1>Convert</h1>
      <CurrencyRow />
      <div className="equals">=</div>
      <CurrencyRow />
    </>
  );
}
