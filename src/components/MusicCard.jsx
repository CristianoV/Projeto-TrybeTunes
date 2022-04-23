import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      marcado: false,
    };
  }

  componentDidMount() {
    this.recuperando();
  }

  recuperando = async () => {
    this.setState({ loading: true });
    const { music } = this.props;
    const recuperando = await getFavoriteSongs();
    const teste = recuperando.some((track) => track.trackId === music.trackId);
    this.setState({ loading: false, marcado: teste });
  }

  teste = async () => {
    const { marcado } = this.state;
    this.setState({ loading: true });
    const { music } = this.props;
    if (marcado) {
      await removeSong(music);
      this.setState({ loading: false, marcado: false });
    } else {
      await addSong(music);
      this.setState({ loading: false, marcado: true });
    }
  };

  render() {
    const { name, track, music } = this.props;
    const { loading, marcado } = this.state;
    return loading ? <Loading /> : (
      <>
        <p>{name}</p>
        <audio data-testid="audio-component" src={ track } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favorites">
          Favorita
          <input
            type="checkbox"
            name=""
            id="favorites"
            checked={ marcado }
            data-testid={ `checkbox-music-${music.trackId}` }
            onClick={ () => this.teste() }
          />
        </label>
      </>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  name: PropTypes.string.isRequired,
  track: PropTypes.string.isRequired,
  music: PropTypes.shape({
    trackId: PropTypes.number,
  }).isRequired,
};
