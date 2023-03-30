#!/usr/bin/env node

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const argv = yargs(hideBin(process.argv)).argv;

const date = new Date();

if (argv.month || argv.m) {
  date.setMonth(date.getMonth() - (argv.month || argv.m));
  console.log(date.toISOString());
} else if (argv.day || argv.d) {
  date.setDate(date.getDate() - (argv.day || argv.d));
  console.log(date.toISOString());
}
