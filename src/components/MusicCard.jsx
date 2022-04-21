import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { name, track } = this.props;
    return (
      <>
        <p>{name}</p>
        <audio data-testid="audio-component" src={ track } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>

      </>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  name: PropTypes.string.isRequired,
  track: PropTypes.string.isRequired,
};
