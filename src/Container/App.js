import React,{useState,useEffect} from "react";
import CardList from "../Components/CardList";
import SearchBox from '../Components/SearchBox';
import './App.css';
import ErrorBoundary from "../Components/ErrorBoundary";
import Scroll from '../Components/Scroll';


function App() {
    const [Robots, setRobots] =useState([])
    const [searchfield, setSearchfield] =useState('')
    const [count, setCount]=useState(0)

    useEffect(()=> {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=> response.json())
        .then(users => {setRobots(users)});
        console.log(count)
    },[count]) //only run if count changes.


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

export default App;