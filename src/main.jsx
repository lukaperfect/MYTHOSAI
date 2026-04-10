import React from 'react'
import { createRoot } from 'react-dom/client'
import Noire from './App.jsx'

// Polyfill window.storage for standalone deployment (replaces Claude artifact storage)
if (!window.storage) {
  window.storage = {
    async get(key, shared = false) {
      try {
        const prefix = shared ? '__shared__' : '__personal__';
        const val = localStorage.getItem(prefix + key);
        return val ? { key, value: val, shared } : null;
      } catch { return null; }
    },
    async set(key, value, shared = false) {
      try {
        const prefix = shared ? '__shared__' : '__personal__';
        localStorage.setItem(prefix + key, value);
        return { key, value, shared };
      } catch { return null; }
    },
    async delete(key, shared = false) {
      try {
        const prefix = shared ? '__shared__' : '__personal__';
        localStorage.removeItem(prefix + key);
        return { key, deleted: true, shared };
      } catch { return null; }
    },
    async list(prefix = '', shared = false) {
      try {
        const storagePrefix = shared ? '__shared__' : '__personal__';
        const keys = [];
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k.startsWith(storagePrefix + prefix)) {
            keys.push(k.replace(storagePrefix, ''));
          }
        }
        return { keys, prefix, shared };
      } catch { return { keys: [], prefix, shared }; }
    }
  };
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Noire />
  </React.StrictMode>
)
