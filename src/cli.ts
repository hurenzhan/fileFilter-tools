#!/usr/bin/env ts-node

import program from 'commander';
import {optionConfig} from "./config";
const {version} = require('../package.json');
import MainHandle from "./main";
// const vm = require("vm");

program.version(version)

const usages: string[] = [];
// 添加配置信息
optionConfig.forEach(item => {
    usages.push(item.usage);
    program.option(item.option, item.description, item.defaultValue)
});

// 示例
program.on('--help', function () {
    console.log('\nExamples:')
    usages.forEach(usage => console.log('  ' + usage))
});

program.parse(process.argv)

// 获取参数
const ops = program.opts();

// 缺少参数列表
// let lackConditions = [];
// lackConditions = Object.entries(ops)
// console.log(ops);
// console.log(vm.isContext('rrr'));
new MainHandle(ops);