import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import PokemonList from './components/pokemonlist'
//const URL_API = 'https://pokeapi.co/api/v2/pokemon/';
const DISPLAY_POKEMONS = 8;


ReactDOM.render(<PokemonList numberOfPokemon={DISPLAY_POKEMONS} />,  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
