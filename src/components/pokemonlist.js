import React, {Component} from 'react';
import {Pokemon} from './pokemon';

class PokemonList extends Component {

  
  render() {
    let pokemon = [];
   for(let i = 1; i <= this.props.numberOfPokemon; ++i) {
     pokemon.push(i);
   }
    return (
      <div class=''>
        <div className='card-deck'>
          {
            pokemon.map(pk => (
              <Pokemon id={pk} />
            ))
          }
        </div>
      </div>
    );
  }
}


export default PokemonList;