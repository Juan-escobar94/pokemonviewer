import React from 'react';
// import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import PokemonList from './components/pokemonlist'
//const URL_API = 'https://pokeapi.co/api/v2/pokemon/';
const DISPLAY_POKEMONS = 20;

// import './App.css';

function App() {
  return (
    <>
    <Header />
    <PokemonList numberOfPokemon={DISPLAY_POKEMONS} />
    </>
  );
}

const Header = () => {
  return(
    <header>
      <div className='navbar navbar-dark bg-dark shadow-sm'>
        <div className='container d-flex justify-content-between'>
          <div className='navbar-brand d-flex align-items-center'>
            <strong>Pokemon Viewer</strong>
          </div>  
        </div>
      </div>
    </header>
  );
}


export default App;
