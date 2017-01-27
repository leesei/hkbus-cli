const _ = require('lodash');
const chalk = require('chalk');
const HKBus = require('hkbus');

const Const = require('../constants');

exports.command = 'stops <route> [bound]';
exports.describe = 'List bus stops of a route';
exports.aliases = ['stop'];

exports.builder = {
  route: Const.route
};

function printStops (route) {
  console.log(`[${route.bound}] ${chalk.red.bold.bgWhite(route.route)} ${chalk.italic(route.origin)} ➡ ${chalk.italic(route.dest)}`);
  console.log('=============');
  route.stops.map(stop => {
    console.log(`${chalk.bold(stop.seq)} ${chalk.cyan(stop.name)} ${chalk.yellow(`\$${stop.fare}`)}        ${stop.location} (${stop.code})`);
  });
  console.log();
}

exports.handler = function (argv) {
  const q = HKBus(_.pick(argv, Const.hkbusOptions));
  q.getStops(argv.route, argv.bound)
    .then(routes => {
      routes.map(route => {
        if (argv.json) {
          console.log(JSON.stringify(route, null, 4));
          return;
        }

        printStops(route);
      });
    })
    .catch(console.error);
};
