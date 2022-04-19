import React from 'react';
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
      <header data-testid="header-component">
        <h1>TrybeTunes</h1>
        <p data-testid="header-user-name">{ nickName }</p>
      </header>
    );
  }
}

export default Header;
