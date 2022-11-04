import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);

let api = '/api';
if (import.meta.env.VITE_API_URL) {
  api = import.meta.env.VITE_API_URL;
}

export { api };
