import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { GlobalStyle } from './global.styles';

import HomePage from './pages/home/home.component';
import WatchPage from './pages/watch/watch.component';
import Sidebar from './components/sidebar/sidebar.component';
import styled from 'styled-components';

const AppContainer = styled.div`
	display: flex;
`

const App = () => {
  return (
    <AppContainer>
			<GlobalStyle />
			<Sidebar />
      <Switch>
				<Route exact path='/' component={HomePage} />
				<Route exact path='/playlist/:playlistId' component={WatchPage} />
			</Switch>
    </AppContainer>
  );
}

export default App;