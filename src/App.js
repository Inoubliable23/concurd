import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import { GlobalStyle } from './global.styles';

import HomePage from './pages/home/home.component';
import WatchPage from './pages/watch/watch.component';
import Sidebar from './components/sidebar/sidebar.component';
import PlaylistEdit from './pages/playlist-edit/playlist-edit.component';
import PlaylistCreate from './pages/playlist-create/playlist-create.component';

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
				<Route exact path='/create' component={PlaylistCreate} />
				<Route exact path='/edit/:playlistId' component={PlaylistEdit} />
			</Switch>
    </AppContainer>
  );
}

export default App;