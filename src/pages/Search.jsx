import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      button: true,
      search: '',
      // loading: '',
    };
  }

  // buttonClick = async (value) => {
  //   this.setState({ loading: true });
  //   const { history } = this.props;
  //   await createUser({ name: value });
  //   history.push('/search');
  // }

  validationNumberCaracter = () => {
    const { search } = this.state;
    const minimalNumberCaracter = 2;
    if (search.length >= minimalNumberCaracter) {
      return this.setState({ button: false });
    } return this.setState({ button: true });
  };

  searchartist = ({ target }) => {
    this.setState({ search: target.value }, () => this.validationNumberCaracter());
  }

  render() {
    const { search, button } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            name="artist"
            placeholder="Nome do artista"
            id="searchArtist"
            data-testid="search-artist-input"
            value={ search }
            onChange={ this.searchartist }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ button }
            // onClick={ () => this.buttonClick(name) }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
