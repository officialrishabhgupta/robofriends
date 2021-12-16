import React,{useState,useEffect} from "react";
import { connect } from "react-redux";
import CardList from "../Components/CardList";
import SearchBox from '../Components/SearchBox';
import './App.css';
import ErrorBoundary from "../Components/ErrorBoundary";
import Scroll from '../Components/Scroll';
import {requestRobots, setSearchField} from '../actions';



function App(props) {

    const [Robots,setRobots] =useState([])

    useEffect(()=> {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=> response.json())
        .then(users => {setRobots(users)});
    },[]) //only run if count changes.


    const onSearchChange = (event)=> {
        props.xyz(event)
    }

    const filteredRobots = Robots.filter(Robots=>{
        return Robots.name.toLowerCase().includes(props.searchField.toLowerCase());
    })
    return(
        <div className='tc'>
        <h1 className='f1'>ROBOFRIENDS</h1>
        {/* <button onClick={()=>setCount(count+1)}>Click Me!</button> */}
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
            searchField: state.searchRobots.searchField,
            Robots: state.requestRobots.Robots,
            isPending: state.requestRobots.isPending,
            error: state.requestRobots.error
        }
    }
    const mapDispatchToProps = (dispatch) => {
        return{
            xyz:(event) => dispatch(setSearchField(event.target.value)),
            onRequestRobots:() => dispatch(requestRobots())
        }
    }

export default connect(mapStateToProps, mapDispatchToProps)(App);