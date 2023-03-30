#!/usr/bin/env node

const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");
const fs = require("fs");
const path = require("path");
const file = path.join(__dirname, "logs", "logs.txt");
const dir = path.join(__dirname, "logs");

const rl = readline.createInterface({ input, output });
const number = Math.round(Math.random()) + 1;
let result = true;

rl.question("Орел или решка? Введите 1 или 2:", (answer) => {
  if (Number(answer) != number) {
    result = false;
  }

  if (!fs.existsSync(file)) {
    fs.mkdirSync(dir, (err) => {
      console.error(err);
    });
  }
  fs.readFile(file, "utf-8", (err, data) => {
    fs.writeFile(file, `${data}, ${result}`, () => {});
  });

  rl.close();
});
