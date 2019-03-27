import React, { Component } from 'react';
import './App.css'; 

const Route = require("react-router-dom").Route;
const Router = require("react-router-dom").BrowserRouter;
const Link = require("react-router-dom").Link;
const NavLink = require("react-router-dom").NavLink;
const Redirect = require("react-router-dom").Redirect;
const Prompt = require("react-router-dom").Prompt;


const User = ({matchContent})=> {
  return(<h1>Welcome, {matchContent.params.username}!</h1>)
}

const actStyle = {
  color : "green",
  backgroundColor: "red"
}

class App extends Component {

  state = {
    loggedIn: false
  }

  loginHandle = ()=> {
    this.setState(prevState=>{
      return ({loggedIn : !prevState.loggedIn})
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          
          <ul>
            <li>
              <NavLink activeStyle={actStyle} exact to="/">Home</NavLink>
            </li>
            <li>
              <NavLink activeStyle={actStyle} exact to="/about">About</NavLink>
            </li>
            <li>
              <NavLink activeStyle={actStyle} exact to="/user/John">Hello John</NavLink>
            </li><li>
              <NavLink activeStyle={actStyle} exact to="/user/Bob">Hello Bob</NavLink>
            </li>
          </ul>

          <input type="button" value={!this.state.loggedIn ? "Log in" : "Log out" } onClick={this.loginHandle.bind(this)}></input>

          <Route path="/" exact strict render={()=>{
            return (<h1>Welcome Home</h1>)
          }}/>       

          <Route path="/about" exact strict render={()=>{
            return (<h1>About</h1>)
          }}/>  

          <Route path="/user/:username" exact strict render={({match})=>{ 
            return(this.state.loggedIn ? (<User matchContent={match} />) : (<Redirect to="/" />))
          }}/>  

          <Prompt 
            when={!this.state.loggedIn}
            // message={(location)=>{
            //   return location.pathname.startsWith("/user") ? "Are you sure?" : true
            // }}
            message={"Are you sure???"}
          />

        </div>
      </Router>
    );
  }
}

export default App;
