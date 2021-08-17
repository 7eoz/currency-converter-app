import React from 'react';
import CurrencyRow from './CurrencyRow';

export default function App() {
  return (
    <>
      <h1>Convert</h1>
      <CurrencyRow />
      <div>=</div>
      <CurrencyRow />
    </>
  );
}
