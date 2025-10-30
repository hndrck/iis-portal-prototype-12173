import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Handle GitHub Pages SPA redirect from 404.html
const redirect = sessionStorage.getItem('redirect');
if (redirect) {
  console.log('Restoring route from 404 redirect:', redirect);
  sessionStorage.removeItem('redirect');
  window.history.replaceState(null, '', redirect);
}

console.log('Main.tsx - Current location:', window.location.href);
console.log('Main.tsx - Pathname:', window.location.pathname);

createRoot(document.getElementById("root")!).render(<App />);
