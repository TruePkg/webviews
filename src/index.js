import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Route } from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'

import asyncComponent from './utils/asyncComponent'
import theme from './theme'
import createStore from './store'
import logger from './utils/logger'
import { startImmutableDevTools } from './utils/immutable'
// import { withTracker } from './utils/ga'

injectTapEventPlugin()

const store = createStore()
const Logger = logger('index')

Logger.log(store)

startImmutableDevTools()

const App = asyncComponent(
    () => import('./views/App/container')
)

ReactDOM.render(
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/" component={App} />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
// registerServiceWorker();
