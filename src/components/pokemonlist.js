import React, {Component} from 'react';
import {Pokemon} from './pokemon';

class PokemonList extends Component {

  
  render() {
    let pokemon = [];
   for(let i = 1; i <= this.props.numberOfPokemon; ++i) {
     pokemon.push(i);
   }
    return (
      <div className='album py-5 bg-light'>
        <div className='row'>
          {
            pokemon.map(pk => (
              <Pokemon key={pk} id={pk} />
            ))
          }
        </div>
      </div>
    );
  }
}

const PokemonListContainer = ({numberOfPokemon}) => {


  return (
    <div className='container'>
      <PokemonList numberOfPokemon={numberOfPokemon} />
    </div>
  )
}





export default PokemonListContainer;