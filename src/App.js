import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './Card';

const App = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [sorted, setSorted] = useState(false);

  // Fetching data using .then
  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
      .then(response => response.json())
      .then(data => {
        setCoins(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Fetching data using async/await
  const fetchData = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
      const data = await response.json();
      setCoins(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Search functionality
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Sort by market cap
  const sortByMarketCap = () => {
    const sortedData = [...coins].sort((a, b) => b.market_cap - a.market_cap);
    setCoins(sortedData);
    setSorted(!sorted);
  };

  // Filtered data for search
  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase()) || 
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Crypto Coins</h1>
      <div className="search-sort">
        <input type="text" placeholder="Search by name or symbol" value={search} onChange={handleSearch} />
        <button onClick={sortByMarketCap}>Sort by Market Cap</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Current Price</th>
            <th>Total Volume</th>
          </tr>
        </thead>
        <tbody>
          {filteredCoins.map(coin => (
            <Card key={coin.id} coin={coin} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

