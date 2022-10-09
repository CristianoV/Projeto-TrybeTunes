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
      incorrectEmail: false,
      email: '',
      emailConfirmed: '',
      checkbox: false,
      checkboxChecked: false,
      password: '',
      loading: '',
    };
  }

  validationNumberCaracter = () => {
    const { email, password } = this.state;
    const minimalNumberCaracter = 3;
    if (email.length >= minimalNumberCaracter
      && password.length >= minimalNumberCaracter) {
      return this.setState({ button: false });
    } return this.setState({ button: true });
  };

  changeEmail = ({ target }) => {
    this.setState({ email: target.value }, () => this.validationNumberCaracter());
  }

  changeEmailConfirmed = ({ target }) => {
    this.setState({ emailConfirmed: target.value });
  }

  changeNickPassword = ({ target }) => {
    this.setState({ password: target.value }, () => this.validationNumberCaracter());
  }

  buttonClick = async (value) => {
    const { email, emailConfirmed, checkbox } = this.state;
    if (email !== emailConfirmed) return this.setState({ incorrectEmail: true });
    this.setState({ incorrectEmail: false });
    if (!checkbox) return this.setState({ checkboxChecked: true });
    this.setState({ checkboxChecked: false });
    this.setState({ loading: true });
    const { history } = this.props;
    await createUser({ name: value });
    history.push('/search');
  }

  render() {
    const { button, email, loading, password,
      emailConfirmed, incorrectEmail, checkbox, checkboxChecked } = this.state;
    return loading ? (<Loading />) : (
      <div data-testid="page-login" className={ style.container }>
        <img src="https://static.vecteezy.com/system/resources/previews/001/208/095/large_2x/music-player-png.png" alt="logo do site" />
        <form>
          <h1>Inscreva-se grátis e comece a curtir.</h1>
          <label htmlFor="name">
            Qual é o seu e-mail?
            <input
              type="text"
              name="name"
              id="name"
              value={ email }
              onChange={ this.changeEmail }
              data-testid="login-name-input"
            />
          </label>
          <label htmlFor="emailConfirmed">
            Confirme seu e-mail
            <input
              type="text"
              name="emailConfirmed"
              id="emailConfirmed"
              value={ emailConfirmed }
              onChange={ this.changeEmailConfirmed }
              data-testid="login-name-input"
            />
            {incorrectEmail && <span>Email não confere</span>}
          </label>
          <label htmlFor="password">
            Crie uma senha
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
              <input
                type="checkbox"
                name="record"
                id="record"
                checked={ checkbox }
                onChange={ () => this.setState({ checkbox: !checkbox }) }
              />
              Eu Não sou um robô
            </h1>
            <button
              type="button"
              value="Entrar"
              data-testid="login-submit-button"
              disabled={ button }
              onClick={ () => {
                this.buttonClick(email);
              } }
            >
              Inscrever-se
            </button>
          </div>
          {checkboxChecked && (
            <h1>
              <span>Confirme que você não é um robô</span>
            </h1>)}
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
