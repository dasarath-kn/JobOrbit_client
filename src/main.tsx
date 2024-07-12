import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import store from './Redux/Store.tsx';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>

    <GoogleOAuthProvider clientId="214554875690-osjsqce55e64tn59i9vtdf0n1og9lb6r.apps.googleusercontent.com">
      
    <App />
      </GoogleOAuthProvider>;
    </Provider>
  </React.StrictMode>,
)
