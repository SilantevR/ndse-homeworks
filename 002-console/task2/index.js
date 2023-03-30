#!/usr/bin/env node

const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");

const rl = readline.createInterface({ input, output });
const number = Math.floor(Math.random() * 100 + 1);

const recursiveQuestion = () => {
  rl.question("Загадано число в диапазоне от 0 до 100?", (answer) => {
    if (Number(answer) === number) {
      console.log(`Отгадано число: ${answer}`);
      return rl.close();
    } else if (Number(answer) > number) {
      console.log(`Число меньше: ${answer}`);
      recursiveQuestion();
    } else if (Number(answer) < number) {
      console.log(`Число больше: ${answer}`);
      recursiveQuestion();
    }
  });
};

recursiveQuestion();
