const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, ".env");

const API_KEY = "0854001e24214c08e7eb1a3bb0172639";
const CITY = "Yaroslavl";

fs.readFile(file, "utf-8", (err, data) => {
  fs.writeFile(file, `API_KEY=${API_KEY}\nCITY=${CITY}`, () => {});
});
