function padZeros (num, len) {
  var s = num + '';
  while (s.length < len) s = '0' + s;
  return s;
}

function getTime (date) {
  return `${padZeros(date.getHours(), 2)}:${padZeros(date.getMinutes(), 2)}`;
}

module.exports = {
  padZeros,
  getTime
};
