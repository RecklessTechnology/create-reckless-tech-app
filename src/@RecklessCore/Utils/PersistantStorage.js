import { isHost } from './userCheck';

// Save data in local or session storage.
const persistData = (key, data) => {
  if (isHost()) {
    // Hosts remember room details between sessions
    // eslint-disable-next-line no-undef
    localStorage.setItem(key, JSON.stringify(data));
  } else {
    // Peers will forget room details when a tab / window is closed
    // eslint-disable-next-line no-undef
    sessionStorage.setItem(key, JSON.stringify(data));
  }
};

const restoreData = (key) => {
  if (isHost()) {
    // eslint-disable-next-line no-undef
    return JSON.parse(localStorage.getItem(key));
  }

  // eslint-disable-next-line no-undef
  return JSON.parse(sessionStorage.getItem(key));
};

export {
  persistData,
  restoreData,
};
