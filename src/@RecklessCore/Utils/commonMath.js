const rpmToMili = (rpm, resolution) => ((60 * 1000) / rpm) / (360 / resolution);

/*
Groups array by prop.
From: groupBy([{ prop1: 'hello', prop2: 'world' }, { prop1: 'hello2', prop2: 'world2' }], 'prop1')
To: {
  "hello": [{"prop1": "hello", "prop2": "world"}],
  "hello2": [{"prop1": "hello2","prop2": "world2"}]
}
*/
const groupBy = (array, prop) => array.reduce((acc, value) => {
  // Group initialization
  if (!acc[value[prop]]) {
    acc[value[prop]] = [];
  }

  // Grouping
  acc[value[prop]].push(value);

  return acc;
}, {});

export {
  // eslint-disable-next-line import/prefer-default-export
  rpmToMili,
  groupBy,
};
