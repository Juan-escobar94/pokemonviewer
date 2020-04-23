import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PokemonListContainer from './components/pokemonlist';
import PokemonDetailed from './components/pokemondetailed'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
const DISPLAY_POKEMONS = 10;

function App() {
  return (
    <Router>
    <Header />
      <Switch>
        <Route path="/pokemon/:id">
          <PokemonDetailed />
        </Route>
        <Route path="/">
          <main role='main'>
            <FilterControls />
          </main>
        </Route>
        
      </Switch>
    <Footer />
    </Router>
  );
}

const Header = () => {
  return(
    <header>
      <div className='navbar navbar-dark fixed-top bg-dark shadow-sm'>
        <div className='container d-flex justify-content-between'>
          <a href="/" className='navbar-brand d-flex align-items-center'>
            <img className="mr-2" width="30" height="30" alt="" src="https://image.flaticon.com/icons/svg/1752/1752772.svg"></img>
            <strong>Pokemon Browser</strong>
          </a>  
        </div>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
             <a class="nav-link" href="/pokemon/3/">Detail <span class="sr-only">(current)</span></a>
          </li>  
        </ul>
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
            <button  class="btn btn-primary my-2" onClick={this.props.handleFilter}>Filter</button>
            &nbsp;  
            <button class="btn btn-secondary my-2" onClick={this.props.handleReset}>Reset</button>
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


const Footer = () => {
  return(
  <footer className="text-muted float-bottom">
    <div className="container">
    Icons made by <a href="https://www.flaticon.com/authors/darius-dan" title="Darius Dan">Darius Dan</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
    </div>
  </footer>
  );
}

export default App;
