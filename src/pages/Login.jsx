import React from 'react';
import PropTypes from 'prop-types';
import style from './Login.module.css';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      button: true,
      name: '',
      password: '',
      loading: '',
    };
  }

  validationNumberCaracter = () => {
    const { name, password } = this.state;
    const minimalNumberCaracter = 3;
    if (name.length >= minimalNumberCaracter
      && password.length >= minimalNumberCaracter) {
      return this.setState({ button: false });
    } return this.setState({ button: true });
  };

  changeNickName = ({ target }) => {
    this.setState({ name: target.value }, () => this.validationNumberCaracter());
  }

  changeNickPassword = ({ target }) => {
    this.setState({ password: target.value }, () => this.validationNumberCaracter());
  }

  buttonClick = async (value) => {
    this.setState({ loading: true });
    const { history } = this.props;
    await createUser({ name: value });
    history.push('/search');
  }

  buttonRegister = () => {
    const { history } = this.props;
    history.push('/register');
  }

  render() {
    const { button, name, loading, password } = this.state;
    return loading ? (<Loading />) : (
      <div data-testid="page-login" className={ style.container }>
        <img src="https://static.vecteezy.com/system/resources/previews/001/208/095/large_2x/music-player-png.png" alt="logo do site" />
        <form>
          <label htmlFor="name">
            Endereço de e-mail ou nome de usuário
            <input
              type="text"
              name="name"
              id="name"
              value={ name }
              onChange={ this.changeNickName }
              data-testid="login-name-input"
            />
          </label>
          <label htmlFor="password">
            Senha
            <input
              type="password"
              name="password"
              id="password"
              value={ password }
              onChange={ this.changeNickPassword }
            />
          </label>
          <div className={ style.linha }>
            <h1>
              <input type="checkbox" name="record" id="record" />
              Lembrar de mim
            </h1>
            <button
              type="button"
              value="Entrar"
              data-testid="login-submit-button"
              disabled={ button }
              onClick={ () => this.buttonClick(name) }
            >
              Entrar
            </button>
          </div>
          <h1>Não tem uma conta?</h1>
          <button
            type="button"
            onClick={ this.buttonRegister }
          >
            Inscrever-se no TrybeTunes
          </button>
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
