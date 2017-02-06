module.exports = {
  route: {
    type: 'string',
    coerce: r => String(r).toUpperCase()
  },
  hkbusOptions: ['lang', 'operator', 'verbose']
};
