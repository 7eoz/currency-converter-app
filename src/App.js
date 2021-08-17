import React from 'react';
import CurrencyRow from './CurrencyRow';
import './App.css';

export default function App() {
  return (
    <>
      <h1>Convert</h1>
      <CurrencyRow />
      <div className="equals">=</div>
      <CurrencyRow />
    </>
  );
}
