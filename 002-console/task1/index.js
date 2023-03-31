#!/usr/bin/env node

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

yargs(hideBin(process.argv))
  .command({
    command: "current",
    describe: "дата и время в формате ISO вперед",
    builder: {
      date: {
        alias: "d",
        type: "boolean",
        demandOption: false,
        describe: "Количество дней",
      },
      month: {
        alias: "m",
        type: "boolean",
        demandOption: false,
        describe: "Количество месяцев",
      },
      year: {
        alias: "y",
        type: "boolean",
        demandOption: false,
        describe: "Количество лет",
      },
    },
    handler({ date = false, month = false, year = false }) {
      let time = new Date();
      if (year) {
        console.log(time.getFullYear());
      } else if (month) {
        console.log(time.getMonth() + 1);
      } else if (date) {
        console.log(time.getDate());
      } else {
        console.log(time.toISOString());
      }
    },
  })
  .parse();

yargs(hideBin(process.argv))
  .command({
    command: "add",
    describe: "дата и время в формате ISO вперед",
    builder: {
      day: {
        alias: "d",
        type: "number",
        demandOption: false,
        describe: "Количество дней",
      },
      month: {
        alias: "m",
        type: "number",
        demandOption: false,
        describe: "Количество месяцев",
      },
      year: {
        alias: "y",
        type: "number",
        demandOption: false,
        describe: "Количество лет",
      },
    },
    handler({ day = 0, month = 0, year = 0 }) {
      let date = new Date();
      if (day) {
        date.setDate(date.getDate() + day);
      } else if (month) {
        date.setMonth(date.getMonth() + month);
      } else if (year) {
        date.setFullYear(date.getFullYear() + year);
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
      day: {
        alias: "d",
        type: "number",
        demandOption: false,
        describe: "Количество дней",
      },
      month: {
        alias: "m",
        type: "number",
        demandOption: false,
        describe: "Количество месяцев",
      },
      year: {
        alias: "y",
        type: "number",
        demandOption: false,
        describe: "Количество лет",
      },
    },
    handler({ day = 0, month = 0, year = 0 }) {
      let date = new Date();
      if (day) {
        date.setDate(date.getDate() - day);
      } else if (month) {
        date.setMonth(date.getMonth() - month);
      } else if (year) {
        date.setFullYear(date.getFullYear() - year);
      }
      console.log(date.toISOString());
    },
  })
  .parse();
