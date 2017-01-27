#!/usr/bin/env node

require('yargs')
  .usage('Usage: $0 <command> [options]')
  .version()
  .alias('v', 'version')
  .help()
  .alias('h', 'help')
  .options('lang', {
    alias: 'l',
    default: 'cht',
    choices: ['eng', 'cht', 'chs'],
    describe: 'language for results',
    global: true
  })
  .options('operator', {
    alias: 'o',
    default: 'kmb',
    choices: ['kmb'],
    describe: 'bus operator',
    global: true
  })
  .options('verbose', {
    alias: 'V',
    describe: 'verbose',
    count: true,
    type: 'number',
    global: true
  })
  .options('json', {
    alias: 'j',
    describe: 'outputs JSON',
    type: 'boolean',
    global: true
  })
  .commandDir('./cmd/')
  // .example('$0 console', 'Interactive console.')
  .example('$0 stops 74D 1', 'List bus stops of a route.')
  .example('$0 eta 74D 1 20', 'Get ETA on a particular bus stop.')
  // .example('$0 stars', 'Show ETA of starred bus stops.')
  // .example('$0 star 74D 1 20', 'Star a bus stop.')
  // .example('$0 unstar 74D 1 20', 'Unstar a bus stop.')
  .demand(1)
  .wrap(null)
  .recommendCommands()
  .strict()
  .argv;
