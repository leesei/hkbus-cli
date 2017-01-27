module.exports = {
  route: {
    type: 'string',
    coerce: r => r.toUpperCase()
  },
  hkbusOptions: ['lang', 'operator', 'verbose']
};
