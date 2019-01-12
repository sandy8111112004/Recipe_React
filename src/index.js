import React from 'react';
import ReactDOM from 'react-dom';
import Grid from 'react-css-grid';
import './reset.css';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';

const DirectoryView = (props)=>(
    <div>
        <SearchForm 
        changeHandler={props.handleChange} 
        value={props.value} 
        searchHandler={props.handleSearch}
        />
        <br/>
        {props.allRecipe.map((e,i)=> <RecipeCard name={e.name} id={e.id} RecipeSelector = {props.selectRecipes}  key={i}/>)}
    </div>
)

const SearchForm = (props)=>(
    <div>
        <form>
            <input id='searchInput' value ={props.value} onChange={props.changeHandler}></input>
            <button onClick={props.searchHandler} id='searchBtn'>SEARCH</button>
        </form>
    </div>
)

const RecipeCard = (props)=>(
    <div >
        <button className='entry' onClick={()=>props.RecipeSelector(props.id)}>{props.name}</button>
    </div>
)

const DetailedRecipe = (props) =>(
    <div>
        <h1><i className="fas fa-utensils foodIcon"></i>  {props.displayEntry.name?props.displayEntry.name:'Please Select A Recipe'}</h1>
        <br/>
        <br/>
        <Grid width='10vw' gap={0}>
            <div>
                <h4><b>INGREDIENTS:</b></h4>
                <br/>
                {props.displayEntry.ingredients?props.displayEntry.ingredients.map((e,i)=> <DetailedIngredient element={e} key={i} />):'Secret Ingredients!'}
            </div>
            <div>
                <h4><b>INSTRUCTIONS:</b></h4>
                <br/>
                {props.displayEntry.instructions?props.displayEntry.instructions.map((e,i)=> <DetailedInstruction element={e} key={i}  />):'Secret Instruction!'}
            </div>
        </Grid>
    </div>
)

const DetailedIngredient = (props) =>(
    <div>
        <p>{props.element}</p>
    </div>
)

const DetailedInstruction = (props) => (
    <div>
        <p>{props.element}</p>
    </div>
)

const PageTitle = (props) => (
    <div>
        <h2 id='title-style'><i className="fas fa-utensils titleIcon"></i> RecipeApp</h2>
    </div>
)

class App extends React.Component {
    state={
        Recipes:[
            {
            id: 1,
            name: 'TURKEY + STUFF',
            ingredients: ['Turkey', 'Mustard', 'Greens', 'Celery', 'Potato'],
            instructions: ['Pre-heat over to 350', 'Tickle the turkey', 'Cut some celery']
          },
          {
            id: 2,
            name: 'CHICKEN + STUFF',
            ingredients: ['Chicken', 'Mustard', 'Greens', 'Celery', 'Potato'],
            instructions: ['Pre-heat over to 350', 'Tickle the chicken', 'Cut some celery']
          },
          {
            id: 3,
            name: 'BEEF + STUFF',
            ingredients: ['Beef', 'Mustard', 'Greens', 'Celery', 'Potato'],
            instructions: ['Pre-heat over to 350', 'Tickle the beef', 'Cut some celery']
          },
          {
            id: 4,
            name: 'PPORK + STUFF',
            ingredients: ['Pork', 'Mustard', 'Greens', 'Celery', 'Potato'],
            instructions: ['Pre-heat over to 350', 'Tickle the pork', 'Cut some celery']
          },
          {
            id: 5,
            name: 'FISH + STUFF',
            ingredients: ['Fish', 'Mustard', 'Greens', 'Celery', 'Potato'],
            instructions: ['Pre-heat over to 350', 'Tickle the fish', 'Cut some celery']
          }
        ],
        input:'',
        selected:[
            {
            id: 1,
            name: 'TURKEY + STUFF',
            ingredients: ['Turkey', 'Mustard', 'Greens', 'Celery', 'Potato'],
            instructions: ['Pre-heat over to 350', 'Tickle the turkey', 'Cut some celery']
          },
          {
            id: 2,
            name: 'CHICKEN + STUFF',
            ingredients: ['Chicken', 'Mustard', 'Greens', 'Celery', 'Potato'],
            instructions: ['Pre-heat over to 350', 'Tickle the chicken', 'Cut some celery']
          },
          {
            id: 3,
            name: 'BEEF + STUFF',
            ingredients: ['Beef', 'Mustard', 'Greens', 'Celery', 'Potato'],
            instructions: ['Pre-heat over to 350', 'Tickle the beef', 'Cut some celery']
          },
          {
            id: 4,
            name: 'PPORK + STUFF',
            ingredients: ['Pork', 'Mustard', 'Greens', 'Celery', 'Potato'],
            instructions: ['Pre-heat over to 350', 'Tickle the pork', 'Cut some celery']
          },
          {
            id: 5,
            name: 'FISH + STUFF',
            ingredients: ['Fish', 'Mustard', 'Greens', 'Celery', 'Potato'],
            instructions: ['Pre-heat over to 350', 'Tickle the fish', 'Cut some celery']
          }
        ],
        displayEntry: {},
    }

    handleChange = (e) =>{
        e.preventDefault();
        this.setState({input:e.target.value});
    }

    handleSearch = (event) => {
        event.preventDefault();
        const RecipeFiltered = this.state.Recipes.filter(e => e.name.indexOf(this.state.input.toUpperCase()) !== -1 );
        this.setState({ selected: RecipeFiltered });
        this.setState({displayEntry: RecipeFiltered[0]});
    }

    selectRecipes = (id) =>{
        this.setState({ displayEntry: [] });
        this.setState({ displayEntry: this.state.Recipes.find(e=>e.id===id) });

    }

    render() {
        return (
            <div id="main-return">
                <PageTitle />
                <Grid width='47vw' gap={0}>
                    <div className="box">
                    <DirectoryView 
                        allRecipe = {this.state.selected}
                        handleChange = {this.handleChange}
                        handleSearch = {this.handleSearch}
                        selectRecipes = {this.selectRecipes}
                        value={this.state.input}
                    />
                    </div>
                    <div className="box">
                    <DetailedRecipe 
                        displayEntry = {this.state.displayEntry}
                    />
                    </div>
                </Grid>
            </div>
        )
    }

}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
