import React from 'react';
import style from './Loading.module.css';

class Loading extends React.Component {
  render() {
    return (
      <div className={ style.container }>
        <h1>Carregando...</h1>
      </div>
    );
  }
}

export default Loading;
