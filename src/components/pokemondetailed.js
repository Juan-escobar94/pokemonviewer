import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';




const PokemonDetailed = () => {
//   const {error, setError} = useState(null);
//   const {isLoaded, setIsLoaded} = useState(false);
//   const {types, setTypes} = useState([]);
//   const {imgSrc, setImgSrc} = useState("");
//   const {pokemonId, setPokemonId} = useState("");
//   const {pokemonName, setPokemonName} = useState("");
  const [data, setData] = useState({
      error: null,
      isLoaded: false,
      types: [],
      img_src: '',
      pokemon_id: '',
      pokemon_name: '',
      
  })
  const [specData, setSpecData] = useState({
      flavor_text: '',
      color: '',
      evolves_from: '',
  })
  let { id } = useParams();
  async function fetchPokeData() {

    let uri = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let response = await fetch(uri);
    let result = await response.json();
    setData({
            isLoaded: true,
            img_src: result["sprites"]["front_default"],
            pokemon_name: result["name"].charAt(0).toUpperCase() + result["name"].substring(1),
            pokemon_id: result["id"],
            types: result["types"]
    })
  }
  async function fetchDetailedPokeData() {
    let uri = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
    let response = await fetch(uri);
    let result = await response.json();
    setSpecData({
      color: result.color.name,
      evolves_from: result.evolves_from_species && result.evolves_from_species.name,
      flavor_text: result.flavor_text_entries[1].flavor_text
    })

  }
  useEffect(() => {
    fetchPokeData();
    fetchDetailedPokeData();
  }, []);


    return(
      <div className="container">
         <div className="card mb-3" style={{maxWidth: '800px'}}>
            <div className="row no-gutters">
              <div className="col-md-4">
                 <img src={data.img_src} className="card-img" alt="" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h2 className="card-title">{data.pokemon_name}</h2>
                  <p className="card-text">{specData.flavor_text}.</p>
                    {specData.evolves_from &&
                    <p className="card-text">
                      Evolves from: <a href={specData.evolves_from}>{specData.evolves_from}</a>
                    </p>
                    }
                    <p className='card-text'>
                      Types: &nbsp;
                      {data.types.map((type, index, arr) => (
                        <span  key={type.type.name}>{type.type.name}{index !== (arr.length - 1) && ", "}</span>
                       ))}.
                    </p>
                  <p className="card-text"><small className="text-muted">pokeID: {data.pokemon_id}</small></p>
                </div>
              </div>  
            </div>
         </div>
      </div>

    )
}

export default PokemonDetailed;