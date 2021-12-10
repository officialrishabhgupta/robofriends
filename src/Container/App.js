import React,{useState,useEffect} from "react";
import { connect } from "react-redux";
import CardList from "../Components/CardList";
import SearchBox from '../Components/SearchBox';
import './App.css';
import ErrorBoundary from "../Components/ErrorBoundary";
import Scroll from '../Components/Scroll';
import {setSearchField} from '../actions';



function App() {
    const [Robots, setRobots] =useState([])
    const [searchfield, setSearchfield] =useState('')
    const [count, setCount]=useState(0)
    const [createStore]=useState()

    useEffect(()=> {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=> response.json())
        .then(users => {setRobots(users)});
        console.log(createStore)
        console.log(count)
    },[count,createStore]) //only run if count changes.



    const onSearchChange = (event)=> {
        setSearchfield(event.target.value)
    }

    const filteredRobots = Robots.filter(Robots=>{
        return Robots.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    return(
        <div className='tc'>
        <h1 className='f1'>ROBOFRIENDS</h1>
        <button onClick={()=>setCount(count+1)}>Click Me!</button>
        <SearchBox searchChange={onSearchChange}/>
        <Scroll>
            <ErrorBoundary>
            <CardList Robots={filteredRobots}/>
            </ErrorBoundary>
        </Scroll>
        </div>
    );
    }


    const mapStateToProps = (state) =>{
        console.log(state)
        return{
            searchField: state.searchField
        }
    }
    const mapDispatchToProps = (dispatch) => {
        return{
            onSearchChange:(event) => dispatch(setSearchField(event.target.value))
        }
    }

export default connect(mapStateToProps, mapDispatchToProps)(App);