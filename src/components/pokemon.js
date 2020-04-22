import React, {Component} from 'react';

class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      types: [],
      img_src: '',
      pokemon_id: '',
      pokemon_name: '',
    }
  }

  componentDidMount() {
    let uri = `https://pokeapi.co/api/v2/pokemon/${this.props.id}`;
    fetch(uri)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            img_src: result["sprites"]["front_default"],
            pokemon_name: result["name"].charAt(0).toUpperCase() + result["name"].substring(1),
            pokemon_id: result["id"],
            types: result["types"]
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
  }

  render() {
    const map = this.props.filterMap;
    let toBeRendered = false;
    let types = this.state.types.map(ind => (
      ind.type.name
    ));
    console.log(types);
    for(let k of map.keys()){
      if(types.includes(k) && map.get(k) !== false){
        toBeRendered = true;
      }
    }
    return(
    <>{toBeRendered &&
    <div className='col-md-4'>
      <div className='card mb-4 shadow-sm' >
        <Sprite imgSrc={this.state.img_src} alt={this.state.pokemon_name}/>
        <PokeID name={this.state.pokemon_name} id={this.state.pokemon_id} types={this.state.types} />
      </div>
    </div>
    }</>
    );
  }
}



const Sprite = ({imgSrc, alt}) => {

  return (
    <div className='bd-placeholder-img'>
      <img className='card-img-top' alt={alt} src={imgSrc} />
    </div>
  );
}

const PokeID = ({name, types, id}) => {
  return (
    <>
        <h5 className='card-title d-flex justify-content-around'>
          {name}
          <small className="text-muted"> &nbsp; ID: {id}</small>
        </h5>
      { types &&
      <div>  
        {/* <div className='card-text d-flex justify-content-center'>Type{types.length > 1 && 's'}</div> */}
          <ul className='card text list-group list-group-flush'>
          {types.map(type => (
            <li  className='list-group-item' key={type.type.name}>{type.type.name}</li>
          ))}
          </ul>
      </div>
      }
    </>
  );
}

export {Pokemon};