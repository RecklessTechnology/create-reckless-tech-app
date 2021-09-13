/* eslint-disable no-undef */

import { isHost } from './userCheck';

// Save data in local or session storage.
const persistData = (key, data) => {
  if (isHost()) {
    // Hosts remember room details between sessions
    localStorage.setItem(key, JSON.stringify(data));
  } else {
    // Peers will forget room details when a tab / window is closed
    sessionStorage.setItem(key, JSON.stringify(data));
  }
};

const restoreData = (key) => {
  if (isHost()) {
    return JSON.parse(localStorage.getItem(key));
  }

  return JSON.parse(sessionStorage.getItem(key));
};

export {
  persistData,
  restoreData,
};
