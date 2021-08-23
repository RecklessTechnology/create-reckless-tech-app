/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */

const isHost = () => (window.location.hash.substr(1) === '');

export {
  isHost,
};
