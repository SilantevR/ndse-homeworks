#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const logs = path.join(__dirname, "logs", "logs.txt");

fs.readFile(logs, "utf-8", (err, data) => {
  if (err) {
    console.error(err);
  }
  const arrData = data.split(", ");

  const games = arrData.length;
  const wins = arrData.reduce((total, el) => {
    if (el === "true") {
      return ++total;
    }
    return total;
  }, 0);
  const loses = arrData.reduce((total, el) => {
    if (el === "false") {
      return ++total;
    }
    return total;
  }, 0);
  console.log(`Игр: ${games}, Побед: ${wins}, Поражений: ${loses}`);
});
