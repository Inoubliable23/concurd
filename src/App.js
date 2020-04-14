import React from 'react';
import { GlobalStyle } from './global.styles';

import YoutubeVideo from './components/youtube-video/youtube-video.component';

const App = () => {
  return (
    <div>
			<GlobalStyle />
      <YoutubeVideo />
    </div>
  );
}

export default App;