import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {DataLayer} from './DataLayer'
import reducer, {initialState} from './reducer'
import { registerSW } from "virtual:pwa-register";

// add this to prompt for a refresh
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New content available. Reload?")) {
      updateSW(true);
    }
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DataLayer initialState={initialState} reducer ={reducer}>
      <App />      
    </ DataLayer>
  </React.StrictMode>
)
