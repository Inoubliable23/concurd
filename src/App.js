import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { GlobalStyle } from './global.styles';

import HomePage from './pages/home/home.component';
import WatchPage from './pages/watch/watch.component';

const App = () => {
  return (
    <div>
			<GlobalStyle />
      <Switch>
				<Route exact path='/' component={HomePage} />
				<Route exact path='/playlist/:playlistId' component={WatchPage} />
			</Switch>
    </div>
  );
}

export default App;