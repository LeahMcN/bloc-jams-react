import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import Album from './components/Album';
import Library from './components/Library';

import Landing from './components/Landing';
import './App.css';


class App extends Component {
  render() {
    return (
    <div>
      <header className="Topnav">

        <nav className="Navbar">
        <ul className="MenuBar">
          <li><Link to='/'>Landing</Link></li>
          <li><Link to='/library'>Library</Link></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        </nav>

      </header>

      <div className="App">
        
        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    </div>
    );
  }
}

export default App;
