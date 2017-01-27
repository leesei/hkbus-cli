const _ = require('lodash');
const chalk = require('chalk');
const HKBus = require('hkbus');

const Const = require('../constants');
const helper = require('../helper');

exports.command = 'eta <route> <bound> <stop>';
exports.describe = 'Get ETA on a particular bus stop';

exports.builder = {
  route: Const.route
};

function printEta ({ route, stop, eta }) {
  console.log(`[${route.bound}] ${chalk.red.bold.bgWhite(route.route)} ${chalk.italic(route.origin)} ➡ ${chalk.italic(route.dest)}`);
  console.log(`${chalk.cyan(stop.name)} ${chalk.yellow(`\$${stop.fare}`)}        ${stop.location} (${stop.code})`);
  eta.eta.map(next => {
    let affix = '';
    if (next.scheduled) {
      affix += '🕥';
    }
    if (next.wheelchair) {
      affix += '♿';
    }
    console.log(`${chalk.white.bold.bgBlack(next.time)} ${affix} @${helper.getTime(eta.updated)}`);
  });
}

exports.handler = function (argv) {
  const q = HKBus(_.pick(argv, Const.hkbusOptions));
  q.getStops(argv.route, argv.bound)
    .then(routes => {
      // we should only have one route
      const route = routes[0];
      if (!route) {
        throw Error(`${argv.route} bound[${argv.bound}] not exist`);
      }
      if (route.bound !== argv.bound && argv.verbose) {
        console.log(chalk.yellow(`bound mismatch: ${route.bound} vs ${argv.bound}`));
      }
      const stop = _.find(route.stops, {seq: argv.stop});

      return q.getEta(route.route, route.bound, stop.code, stop.seq)
        .then(eta => {
          if (argv.json) {
            console.log(JSON.stringify({ stop, eta }, null, 4));
            return;
          }

          printEta({ route, stop, eta });
        });
    })
    .catch(console.error);
};
