import { HashRouter } from 'react-router-dom';

import { AppRouter } from './router/AppRouter';
import './styles/composed.css';

export function App() {
  return (
    <HashRouter>
      <AppRouter />
    </HashRouter>
  );
}
