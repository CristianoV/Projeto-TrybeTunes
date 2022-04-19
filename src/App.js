import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    // const pagina = [
    //   { path: '/', component: Login },
    //   { path: '/search', component: Search },
    //   { path: '/album/:id', component: Album },
    //   { path: '/Favorites', component: Favorites },
    //   { path: 'Profile', component: Profile },
    //   { path: "/profile/edit" component: ProfileEdit },
    //   { path: 'notfound', component: NotFound },
    // ];
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/Favorites" component={ Favorites } />
          <Route exact path="/Profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route component={ NotFound } />
        </Switch>
      </div>
    );
  }
}

export default App;
