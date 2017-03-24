// @flow
import React from 'react';
import './episodeDescription.css';

const EpisodeDescription = () => (
  <div className="episode-description">
    <h3 className="episode-description-date">Episode date</h3>
    <h1 className="episode-description-title">Title of the Episode</h1>
    <p className="episode-description-text">
      Maecenas sed diam eget risus varius blandit sit amet non magna.
      Aenean eu leo quam. Pellentesque ornare sem lacinia quam
      venenatis vestibilum. Nullam id dolor id nibh ultricies vehicula ut id
      elit. Nullam quis risus eget urna mollis ornare vel eu leo. Aenean
      eu leo quam.
    </p>
  </div>
);

export default EpisodeDescription;
