import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; 

import App from './App.jsx';

import './global/fonts.scss';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>
)
