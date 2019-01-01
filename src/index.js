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
        //RecipeSelector = {props.selectRecipes}
        />
        {props.allRecipe.map((e,i)=> <RecipeCard name={e.name}  key={i}/>)}
    </div>
)

const SearchForm = (props)=>(
    <div>
        <form>
            <input value ={props.value} onChange={props.changeHandler}></input>
            <button onClick={props.searchHandler}>Search</button>
        </form>
    </div>
)

const RecipeCard = (props)=>(
    <div>
        <p onClick={props.recipeSelector}>{props.name}</p>
    </div>
)

const DetailedRecipe = (props) =>(
    <div>
        <p>name: {props.name}</p>
        <p>ingredients: {props.ingredients}</p>
        <p>instructions: {props.instructions} </p>
    </div>
)

const PageTitle = (props) => (
    <div>
        <h2 id='title-style'>RecepiApp</h2>
    </div>
)

class App extends React.Component {
    state={
        Recipes:[
            {
            id: 1,
            name: 'turkey + stuff',
            ingredients: ['turkey', 'mustard', 'greens', 'celery', 'potato'],
            instructions: ['pre-heat over to 350', 'tickle the turkey', 'cut some celery']
          },
          {
            id: 2,
            name: 'chicken + stuff',
            ingredients: ['chicken', 'mustard', 'greens', 'celery', 'potato'],
            instructions: ['pre-heat over to 350', 'tickle the chicken', 'cut some celery']
          },
          {
            id: 3,
            name: 'beef + stuff',
            ingredients: ['beef', 'mustard', 'greens', 'celery', 'potato'],
            instructions: ['pre-heat over to 350', 'tickle the beef', 'cut some celery']
          },
          {
            id: 4,
            name: 'pork + stuff',
            ingredients: ['pork', 'mustard', 'greens', 'celery', 'potato'],
            instructions: ['pre-heat over to 350', 'tickle the pork', 'cut some celery']
          },
          {
            id: 5,
            name: 'fish + stuff',
            ingredients: ['fish', 'mustard', 'greens', 'celery', 'potato'],
            instructions: ['pre-heat over to 350', 'tickle the fish', 'cut some celery']
          }
        ],
        input:'',
        selected:[],
    }

    handleChange = (e) =>{
        e.preventDefault();
        this.setState({input:e.target.value});
    }

    handleSearch = (event) => {
        event.preventDefault();
        const RecipeFiltered = this.state.Recipes.filter(e => e.name.indexOf(this.state.input) !== -1 );
        this.setState({ Recipes: RecipeFiltered });
    }

    // selectRecipes = (e) =>{
    //     e.preventDefault();
    //     const RecipeFiltered = this.state.Recipes.filter(e => e.name.indexOf(this.state.input) !== -1 );
    //     this.setState({ selected: RecipeFiltered });

    // }

    render() {
        return (
            <div id="main-return">
                <PageTitle />
                <Grid width='47vw' gap={0}>
                    <div className="box">
                    <DirectoryView 
                        allRecipe = {this.state.Recipes}
                        handleChange = {this.handleChange}
                        handleSearch = {this.handleSearch}
                        //selectRecipes = {this.selectRecipes}
                        value={this.state.input}
                    />
                    </div>
                    <div className="box">
                    <DetailedRecipe 
                        name = { this.state.Recipes[0].name}
                        ingredients = {this.state.Recipes[0].ingredients}
                        instructions = {this.state.Recipes[0].instructions}
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
