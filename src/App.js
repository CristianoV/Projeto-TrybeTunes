import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Header from './components/Header';

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/search" component={ Search }>
            <Header />
          </Route>
          <Route path="/album/:id" component={ Album }>
            <Header />
          </Route>
          <Route path="/Favorites" component={ Favorites }>
            <Header />
          </Route>
          <Route exact path="/Profile" component={ Profile }>
            <Header />
          </Route>
          <Route path="/profile/edit" component={ ProfileEdit }>
            <Header />
          </Route>
          <Route component={ NotFound } />
        </Switch>
      </div>
    );
  }
}

export default App;
