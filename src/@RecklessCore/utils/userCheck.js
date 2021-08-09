/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */

// Returns all props in a nested object
const isHost = () => {
  console.log(window.location);
  console.log(window.location.hash);
  console.log(window.location.hash.substr(1));
  console.log((window.location.hash.substr(1) === ''));
  return (window.location.hash.substr(1) === '');
};

export {
  isHost,
};
