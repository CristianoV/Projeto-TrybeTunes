import React from 'react';
import PropTypes from 'prop-types';
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
      <div data-testid="page-album">
        <Header />
        {albumInformation && (
          <>
            <p data-testid="artist-name">{albumInformation.artistName}</p>
            <p data-testid="album-name">{albumInformation.collectionName}</p>
            <img
              src={ albumInformation.artworkUrl100 }
              alt={ albumInformation.collectionCensoredName }
            />
          </>
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
