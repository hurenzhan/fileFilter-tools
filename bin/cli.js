#!/usr/bin/env ts-node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var program = require('commander');
var pkg = require('../package.json');
program
    .version(pkg.version);
program
    .command('path')
    .description('get a path')
    .action(function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var path = args[1].args[0];
    console.log(path, 'path');
});
program.parse(process.argv);
