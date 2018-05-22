import React from 'react';
import './Landing.css';


const Landing = () => (

  <section className="Landing">
    <div>
    <h1 className="Header">Bloc Jams</h1>
    </div>

    <h2 className="hero-title">Turn the music up!</h2>

    <section className="selling-points">
      <div className="point">
        <h3 className="point-title">Choose your music</h3>
        <p className="point-description">The world is full of music; why should you have to listen to music that someone else chose?</p>
      </div>
      <div className="point">
        <h3 className="point-title">Unlimited, streaming, ad-free</h3>
        <p className="point-description">No arbitrary limits. No distractions.</p>
      </div>
      <div className="Phone-image">
      <img className="Phone" src={window.location.origin + '/assets/images/blocJamsIphone.jpg'} />
      </div>
    </section>
  </section>
);

export default Landing;
