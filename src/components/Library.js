import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';
import './Library.css';


class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData };
  }
  render() {
    return (
      <section className='Library'>
        {
          this.state.albums.map( (album, index) =>
            <Link to={`/album/${album.slug}`} key={index}>
              <img className="Album-Cover" src={album.albumCover} alt={album.title} />
              <div className="Music-info">
              <div className="Title">{album.title}</div>
              <div className="Musician">{album.artist}</div>
              <div className="Song-count">{album.songs.length} songs</div>
              </div>
            </Link>
          )
        }
        <div className="Logo-image">
        <img className="Logo" src={window.location.origin + '/assets/images/bloc_jams_logo.png'} />
        </div>
      </section>
    );
  }
}

export default Library;
