import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

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
        <h1>Bloc Jams</h1>
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
