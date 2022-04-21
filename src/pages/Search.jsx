import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      button: true,
      search: '',
      albuns: [],
      artista: '',
    };
  }

  validationNumberCaracter = () => {
    const { search } = this.state;
    const minimalNumberCaracter = 2;
    if (search.length >= minimalNumberCaracter) {
      return this.setState({ button: false });
    }
    return this.setState({ button: true });
  };

  searchartist = ({ target }) => {
    this.setState({ search: target.value }, () => this.validationNumberCaracter());
  };

  buttonClick = async () => {
    const { search } = this.state;
    const searchartist = await searchAlbumsAPI(search);
    this.setState({
      artista: search,
      albuns: searchartist,
      button: true,
      search: '',
    });
  };

  render() {
    const { button, search, albuns, artista } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            name="artist"
            placeholder="Nome do albuns"
            id="searchArtist"
            data-testid="search-artist-input"
            value={ search }
            onChange={ this.searchartist }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ button }
            onClick={ () => this.buttonClick(search) }
          >
            Pesquisar
          </button>
        </form>
        {albuns[0] && <p>{`Resultado de álbuns de: ${artista}`}</p>}
        {
          artista.length !== 0
            && albuns.length === 0
            ? <p>Nenhum álbum foi encontrado</p>
            : (albuns.map((album) => (
              <Link
                to={ `album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
                key={ album.collectionId }
              >
                <>
                  <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                  <p>{album.collectionName}</p>
                  <p>{album.artistName}</p>
                </>
              </Link>
            ))
            )
        }
      </div>
    );
  }
}

export default Search;
