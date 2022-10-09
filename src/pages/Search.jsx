import React from 'react';
import { Link } from 'react-router-dom';
import style from './Search.module.css';
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

  buttonClick = async (event) => {
    event.preventDefault();
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
      <div data-testid="page-search" className={ style.all }>
        <Header />
        <div
          className={ albuns.length
            ? style.container : style.albumEmpty }
        >
          <form>
            <input
              type="text"
              name="artist"
              placeholder="O que você quer Ouvir?"
              id="searchArtist"
              data-testid="search-artist-input"
              value={ search }
              onChange={ this.searchartist }
              onKeyPress={ (e) => e.key === 'Enter' && this.buttonClick(e) }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ button }
              onClick={ (e) => this.buttonClick(e) }
            >
              Pesquisar
            </button>
          </form>
          <section>
            {albuns[0] && <h1>{`Melhores resultados de: ${artista}`}</h1>}
            <article>
              {
                artista.length !== 0
            && albuns.length === 0
                  ? <p>Nenhum álbum foi encontrado</p>
                  : (albuns.map((album) => (
                    <aside key={ album.collectionId }>
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
                    </aside>
                  ))
                  )
              }
            </article>
          </section>
        </div>
      </div>
    );
  }
}

export default Search;
