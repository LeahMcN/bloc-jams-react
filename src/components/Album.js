import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import './Album.css';


class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      isPlaying: false,
      volume: 0,
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;

    }

    componentDidMount() {
      this.eventListeners = {
        timeupdate: e => {
          this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      }

    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
  }

  componentWillUnmount() {
     this.audioElement.src = null;
     this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
     this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
   }


    play() {
     this.audioElement.play();
     this.setState({ isPlaying: true });
    }

    pause() {
      this.audioElement.pause();
      this.setState({ isPlaying: false });
    }

    setSong(song) {
      this.audioElement.src = song.audioSrc;
      this.setState({ currentSong: song });
    }

    handleSongClick(song) {
      const isSameSong = this.state.currentSong === song;
      if (this.state.isPlaying && isSameSong) {
        this.pause();
      } else {
        if (!isSameSong) { this.setSong(song); }
        this.play();
      }
    }

    handlePrevClick() {
      const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
      const newIndex = Math.max(0, currentIndex - 1);
      const newSong = this.state.album.songs[newIndex];
      this.setSong(newSong);
      this.play();
    }

    handleNextClick() {
     const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
     const newIndex = Math.min(this.state.album.songs.length, currentIndex + 1);
     const newSong = this.state.album.songs[newIndex];
     this.setSong(newSong);
     this.play();
   }


    handleTimeChange(e) {
      const newTime = this.audioElement.duration * e.target.value;
      this.audioElement.currentTime = newTime;
      this.setState({ currentTime: newTime });
      this.formatTime();


    }

    formatTime(seconds) {

      if (seconds < 10){
        return (Math.floor(seconds / 60)) + ":0" + (Math.floor(seconds % 60)) ;
      } else if (seconds > 60 && seconds < 70 || seconds > 120 && seconds < 130 ||
        seconds > 180 && seconds < 190 || seconds > 240 && seconds < 250 ||
        seconds > 300 && seconds < 310 || seconds > 360 && seconds < 370){
        return (Math.floor(seconds / 60)) + ":0" + (Math.floor(seconds % 60));
      } else if (seconds) {
        return (Math.floor(seconds / 60)) + ":" + (Math.floor(seconds % 60));
      }
      return "-:--";
    }

    handleVolumeChange(e) {
      const newVolume = e.target.value;
      this.audioElement.volume = newVolume;
      this.setState({ volume: newVolume });
    }




   render() {
     return (
       <section className="Container">
       <section className="Album">
         <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} />
          <div className="Album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="Artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration -column" />
          </colgroup>
          <tbody>
            {this.state.album.songs.map( (song, index) =>
              <tr className="song" key={index} onClick={() => this.handleSongClick(song)} >
                <td className="song-number">{index+1}</td>
                <td className="song-title">{song.title}</td>
                <td className="Song-actions">
                <button className="Play-or-pause">
                  <span className="ion-play"></span>
                  <span className="ion-pause"></span>
                </button>
                </td>
                <td className="song-duration">{this.formatTime(song.duration)}</td>
              </tr>
            )}
          </tbody>
        </table>
        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          currentTime={this.audioElement.currentTime}
          duration={this.audioElement.duration}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          formatTime={(e) => this.formatTime(e)}
          handleVolumeChange={(e) => this.handleVolumeChange(e)}
        />
       </section>
       <div className="Logo-image">
       <img className="Logo" src={window.location.origin + '/assets/images/bloc_jams_logo.png'} />
       </div>
       </section>
     );
   }
 }

export default Album;
