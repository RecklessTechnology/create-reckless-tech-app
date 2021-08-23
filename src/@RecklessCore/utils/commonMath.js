/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */

const rpmToMili = (rpm, resolution) => ((60 * 1000) / rpm) / (360 / resolution);

export {
  rpmToMili,
};
