import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { GlobalStyle } from './global.styles';

import WatchPage from './pages/watch/watch.component';

const App = () => {
  return (
    <div>
			<GlobalStyle />
      <Switch>
				<Route exact path='/' render={() => <WatchPage playlistId={'1'} />} />
			</Switch>
    </div>
  );
}

export default App;