const rpmToMili = (rpm, resolution) => ((60 * 1000) / rpm) / (360 / resolution);

export {
  // eslint-disable-next-line import/prefer-default-export
  rpmToMili,
};
