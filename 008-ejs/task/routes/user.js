const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(201);
  const user = { id: 1, mail: "test@mail.ru" };
  res.json(user);
});

module.exports = router;
