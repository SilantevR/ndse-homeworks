#!/usr/bin/env node

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

yargs(hideBin(process.argv))
  .command({
    command: "add",
    describe: "дата и время в формате ISO вперед",
    builder: {
      d: {
        type: "number",
        demandOption: false,
        describe: "Количество дней",
      },
      month: {
        type: "number",
        demandOption: false,
        describe: "Количество месяцев",
      },
    },
    handler({ d = 0, month = 0 }) {
      let date = new Date();
      if (d) {
        date.setDate(date.getDate() + d);
      } else if (month) {
        date.setMonth(date.getMonth() + month);
      }
      console.log(date.toISOString());
    },
  })
  .parse();

yargs(hideBin(process.argv))
  .command({
    command: "sub",
    describe: "дата и время в формате ISO вперед",
    builder: {
      d: {
        type: "number",
        demandOption: false,
        describe: "Количество дней",
      },
      month: {
        type: "number",
        demandOption: false,
        describe: "Количество месяцев",
      },
    },
    handler({ d = 0, month = 0 }) {
      let date = new Date();
      if (d) {
        date.setDate(date.getDate() - d);
      } else if (month) {
        date.setMonth(date.getMonth() - month);
      }
      console.log(date.toISOString());
    },
  })
  .parse();

const argv = yargs(hideBin(process.argv)).argv;

const date = new Date();

if (!argv._.length) {
  if (argv.year || argv.y) {
    console.log(date.getFullYear());
  } else if (argv.month || argv.m) {
    console.log(date.getMonth() + 1);
  } else if (argv.date || argv.d) {
    console.log(date.getDate());
  } else {
    console.log(date.toISOString());
  }
}
