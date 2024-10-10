import React, {useEffect, useState} from 'react'
import axios from 'axios';
import Coin from './Coin';
import './Home.css'

function Home() {
    const [coins, SetCoins] = useState([])
    const [search, SetSearch] = useState('')
  
    useEffect(() => {
      axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=BDT&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(res => {
        SetCoins(res.data)
        console.log(res.data);
      }).catch(error => console.log(error))
    }, []);
  
    const handleChange = e => {
      SetSearch(e.target.value)
    }
  
    const filteredCoins = coins.filter(coin => 
      coin.name.toLowerCase().includes(search.toLowerCase())
    );
  
    return (
      <div className='coin-app'>
        <h1 className='app-title'>Crypto Currency App</h1>
  
        <div className='coin-search'>
          <form action=''>
            <input type='text' className='coin-input' placeholder='provide the coin name' onChange={handleChange}/>
          </form>
        </div>
        <div className='coin-header'>
          <div className='coin-row'>
              <div className='coin'>
                <p>Name</p>
              </div>
              <div className='coin-data'>
                <p className='coin-price'>Price</p>
                <p className='coin-percent'>%</p>
                <p className='coin-marketcap'> Mkt Cap. BDT </p>
              </div>
          </div>
        </div>
        {filteredCoins.map(coin => {
          return (
            <Coin key={coin.id} 
              name = {coin.name}
              image={coin.image}
              symbol={coin.symbol}
              marketcap={coin.market_cap}
              price={coin.current_price}
              pricechange={coin.price_change_percentage_24h}
              />
          )
        })}
  
        <p className='develop-by'>Developed By "Kamrul Hasan" & API by coingecko.com</p>
      </div>
    );
}

export default Home
