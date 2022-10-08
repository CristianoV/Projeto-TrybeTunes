import React from 'react';
import { Link } from 'react-router-dom';
import style from './Header.module.css';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      nickName: '',
    };
  }

  async componentDidMount() {
    const searching = await getUser();
    this.setState({ nickName: searching.name });
  }

  render() {
    const { nickName } = this.state;
    return !nickName ? <Loading /> : (
      <header data-testid="header-component" className={ style.container }>
        <h1>TrybeTunes</h1>
        <p data-testid="header-user-name">{ nickName }</p>
        <nav>
          <Link to="/search" data-testid="link-to-search"> Search </Link>
          <Link to="/favorites" data-testid="link-to-favorites"> Favorites </Link>
          <Link to="/profile" data-testid="link-to-profile"> Profile </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
