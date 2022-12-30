import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { store } from 'store';

import { AppRouter } from './router/AppRouter';
import './styles/composed.css';

export function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <AppRouter />
      </HashRouter>
    </Provider>
  );
}
