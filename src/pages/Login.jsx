import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      button: true,
      name: '',
      loading: '',
    };
  }

  validationNumberCaracter = () => {
    const { name } = this.state;
    const minimalNumberCaracter = 3;
    if (name.length >= minimalNumberCaracter) {
      return this.setState({ button: false });
    } return this.setState({ button: true });
  };

  changeNickName = ({ target }) => {
    this.setState({ name: target.value }, () => this.validationNumberCaracter());
  }

  buttonClick = async (value) => {
    this.setState({ loading: true });
    const { history } = this.props;
    await createUser({ name: value });
    history.push('/search');
  }

  render() {
    const { button, name, loading } = this.state;
    return loading ? (<Loading />) : (
      <div data-testid="page-login">
        <form>
          <label htmlFor="name">
            Digite o seu nome:
            <input
              type="text"
              name="name"
              id="name"
              value={ name }
              onChange={ this.changeNickName }
              data-testid="login-name-input"
            />
          </label>
          <input
            type="button"
            value="Entrar"
            data-testid="login-submit-button"
            disabled={ button }
            onClick={ () => this.buttonClick(name) }
          />
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
