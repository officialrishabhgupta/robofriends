import React,{Component} from "react";
import CardList from "../Components/CardList";
import SearchBox from '../Components/SearchBox';
import './App.css';
import ErrorBoundary from "../Components/ErrorBoundary";
import Scroll from '../Components/Scroll';


class App extends Component {
    constructor() {
        super()
        this.state={
            Robots:[],
            searchfield:''  
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=> response.json())
        .then(users => this.setState({Robots:users}));
    }

    onSearchChange=(event)=> {
        this.setState({searchfield:event.target.value})
    }

    render(){
        const {Robots, searchfield}= this.state;
        const filteredRobots = Robots.filter(Robots=>{
            return Robots.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        return(
            <div className='tc'>
            <h1 className='f1'>ROBOFRIENDS</h1>
            <SearchBox searchChange={this.onSearchChange}/>
            <Scroll>
                <ErrorBoundary>
                <CardList Robots={filteredRobots}/>
                </ErrorBoundary>
            </Scroll>
            </div>
        );
    }
}

export default App;