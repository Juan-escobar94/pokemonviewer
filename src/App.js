import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PokemonListContainer from './components/pokemonlist';
import './App.css';
//const URL_API = 'https://pokeapi.co/api/v2/pokemon/';
const DISPLAY_POKEMONS = 150;

function App() {
  return (
    <>
    <Header />
    <main role='main'>
      <FilterControls />
    </main>
    </>
  );
}

const Header = () => {
  return(
    <header>
      <div className='navbar navbar-dark bg-dark shadow-sm'>
        <div className='container d-flex justify-content-between'>
          <div className='navbar-brand d-flex align-items-center'>
            <strong>Pokemon Browser</strong>
          </div>  
        </div>
      </div>
    </header>
  );
}


const types = [
  "normal", "fighting", "flying", "poison", "ground", "rock", "bug", "ghost", "steel",
  "fire", "water", "grass", "electric", "psychic", "ice", "dragon",  "dark", "fairy",
  "unknown", "shadow"
]

class FilterControls extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {checkedItems: new Map(),
                  filterMode: false}
    this.handleChange = this.handleChange.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }


  handleChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked)}));
  }

  handleFilter(e) {
    e.preventDefault();
    this.setState({filterMode: true});
  }

  handleReset(e) {
    e.preventDefault();
    this.setState({checkedItems: new Map (), filterMode: false});
  }


  render() {
    return (
    <>
      <section className='jumbotron' style={{marginBottom: '0em'}}>
        <div className='container'>
          <h2 className='jumbotron-heading text-center'>Browse and Filter Pokemons</h2>
          <CheckboxContainer handleChange={this.handleChange} map={this.state.checkedItems} handleFilter={this.handleFilter}  handleReset={this.handleReset}/>
        </div>
      </section>
      <PokemonListContainer filter={this.state.filterMode} numberOfPokemon={DISPLAY_POKEMONS} filterMap={this.state.checkedItems} />
    </>
    );
  }
  
}

class CheckboxContainer extends React.Component {

  render() {
    return (
    <>
      <div  id="filter-checkboxes" className="row">
      {
        types.map(type => (
          <CheckBox onChange={this.props.handleChange} map={this.props.map} name={type}>{type}</CheckBox>
        ))
      }
      </div>
      <div className="text-center button-group">
            <a href="#" class="btn btn-primary my-2" onClick={this.props.handleFilter}>Filter</a>
            &nbsp;  
            <a href="#" class="btn btn-secondary my-2" onClick={this.props.handleReset}>Reset</a>
      </div>
    </>
    );

  }
}



const CheckBox = ({map, onChange, children, name}) => {
  let checked = map.get(name);
  return (
    <div className="form-check col-md-3">
              <input className="form-check-input" checked={checked} name={name} type="checkbox"  onChange={onChange} id="defaultCheck1" />
              <label className="form-check-label" hmtlFor="defaultCheck1">
                {children}
              </label>
           </div>
  );
}




export default App;
