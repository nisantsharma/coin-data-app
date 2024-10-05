import React from 'react';

const Card = ({ coin }) => {
  return (
    <tr>
      <td><img src={coin.image} alt={coin.name} width="30" /></td>
      <td>{coin.name}</td>
      <td>{coin.symbol.toUpperCase()}</td>
      <td>${coin.current_price.toLocaleString()}</td>
      <td>{coin.total_volume.toLocaleString()}</td>
    </tr>
  );
};

export default Card;
