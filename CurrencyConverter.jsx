import React, { useEffect, useState } from 'react';

const currencyList = [
  { code: 'USD', name: 'United States Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'INR', name: 'Indian Rupee' },
  { code: 'JPY', name: 'Japanese Yen' },
  { code: 'AUD', name: 'Australian Dollar' },
  { code: 'CAD', name: 'Canadian Dollar' },
  { code: 'CHF', name: 'Swiss Franc' },
  { code: 'CNY', name: 'Chinese Yuan' },
  { code: 'BRL', name: 'Brazilian Real' },
];

function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    if (fromCurrency && toCurrency && amount && fromCurrency !== toCurrency) {
      const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`;

      fetch(url)
        .then(res => res.json())
        .then(data => {
          if (data.rates && data.rates[toCurrency]) {
            setConvertedAmount(data.rates[toCurrency].toFixed(2));
          } else {
            setConvertedAmount(null);
          }
        })
        .catch(err => {
          console.error("Frankfurter API Error:", err);
          setConvertedAmount(null);
        });
    } else if (fromCurrency === toCurrency) {
      setConvertedAmount(amount);
    }
  }, [fromCurrency, toCurrency, amount]);

  return (
    <div className="converter">
      <div className="row">
        <input
          type="number"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          {currencyList.map((cur) => (
            <option key={cur.code} value={cur.code}>
              {cur.code} - {cur.name}
            </option>
          ))}
        </select>

        <span>to</span>

        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          {currencyList.map((cur) => (
            <option key={cur.code} value={cur.code}>
              {cur.code} - {cur.name}
            </option>
          ))}
        </select>
      </div>

      <h2>
        {amount} {fromCurrency} = {convertedAmount !== null ? `${convertedAmount} ${toCurrency}` : '...'}
      </h2>
    </div>
  );
}

export default CurrencyConverter;
