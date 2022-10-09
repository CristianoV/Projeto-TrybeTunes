import React from 'react';
import { BsSearch, BsFillHeartFill, BsFillPersonFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import style from './Header.module.css';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      nickName: 'sim',
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
        <div className={ style.logo }>
          <img src="https://static.vecteezy.com/system/resources/previews/001/208/095/large_2x/music-player-png.png" alt="logo do site" />
          <h1>TrybeTunes</h1>
        </div>
        <div className={ style.navegation }>
          <nav>
            <Link to="/search" data-testid="link-to-search">
              <BsSearch />
              {' '}
              Search
            </Link>
            <Link to="/favorites" data-testid="link-to-favorites">
              <BsFillHeartFill />
              {' '}
              Favorites
            </Link>
            <Link to="/profile" data-testid="link-to-profile">
              <BsFillPersonFill />
              {' '}
              Profile
            </Link>
          </nav>
        </div>
        {/* <div className={ style.email }>
          <p data-testid="header-user-name">{ nickName }</p>
        </div> */}
      </header>
    );
  }
}

export default Header;
