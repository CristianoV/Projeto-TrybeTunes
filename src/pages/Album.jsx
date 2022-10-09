import React from 'react';
import PropTypes from 'prop-types';
import style from './Album.module.css';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      albumInformation: '',
      soundTrack: '',
    };
  }

  componentDidMount() {
    this.soundTrack();
  }

  soundTrack = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const musics = await getMusics(id);
    const filtro = musics.filter((elemento, index) => index !== 0);
    this.setState({
      albumInformation: musics[0],
      soundTrack: filtro,
    });
  };

  render() {
    const { albumInformation, soundTrack } = this.state;
    return (
      <div data-testid="page-album" className={ style.all }>
        <Header />
        <section className={ style.container }>
          {albumInformation && (
            <header>
              <img
                src={ albumInformation.artworkUrl100 }
                alt={ albumInformation.collectionCensoredName }
              />
              <div>
                <h3>Album</h3>
                <h1 data-testid="album-name">{albumInformation.collectionName}</h1>
                <p data-testid="artist-name">{albumInformation.artistName}</p>
              </div>
            </header>
          )}
          {albumInformation.length !== 0
          && soundTrack.map((id, index) => (
            <MusicCard
              name={ id.trackName }
              music={ id }
              track={ id.previewUrl }
              key={ index }
            />
          ))}
        </section>
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
