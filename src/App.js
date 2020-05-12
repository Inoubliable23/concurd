import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './global.styles';

import HomePage from './pages/home/home.component';
import WatchPage from './pages/watch/watch.component';
import Sidebar from './components/sidebar/sidebar.component';
import PlaylistEdit from './pages/playlist-edit/playlist-edit.component';
import PlaylistCreate from './pages/playlist-create/playlist-create.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';
import Header from './components/header/header.component';
import { connect } from 'react-redux';
import { checkUserSession } from './redux/user/user.actions';
import { isCheckingSession } from './redux/user/user.selectors';
import FavouritesPage from './pages/favourites/favourites.component';
import HistoryPage from './pages/history/history.components';

const AppContainer = styled.div`
	display: flex;
`
const MainContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`

const theme = {
	primary: '#11142E',
	primaryLight: '#1B1B36',
	secondary: '#F5A623',
	secondaryDark: '#E39412',
	subtext: '#9A9AAB'
}

const App = ({ checkUserSession, isCheckingSession }) => {

	useEffect(() => {
		checkUserSession();
	}, [checkUserSession]);

  return (
		<ThemeProvider theme={theme}>
			<AppContainer>
				<GlobalStyle />
				{
					isCheckingSession ?
					null
					:
					<>
						<Sidebar />
						<MainContainer>
							<Header />
							<Switch>
								<ErrorBoundary>
									<Route exact path='/' component={HomePage} />
									<Route exact path='/favourites' component={FavouritesPage} />
									<Route exact path='/history' component={HistoryPage} />
									<Route exact path='/playlist/:playlistId' component={WatchPage} />
									<Route exact path='/create' component={PlaylistCreate} />
									<Route exact path='/edit/:playlistId' component={PlaylistEdit} />
								</ErrorBoundary>
							</Switch>
						</MainContainer>
					</>
				}
			</AppContainer>
		</ThemeProvider>
  );
}

const mapStateToProps = state => ({
	isCheckingSession: isCheckingSession(state)
});

const mapDispatchToProps = {
	checkUserSession
};

export default connect(mapStateToProps, mapDispatchToProps)(App);