const express = require("express");
const path = require("path")
const fs = require("fs")
const dir = path.join(__dirname, "base")
const file = path.join(__dirname, "base", "counter.json")

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.post("/:id", (req, res)=>{
  const {id} = req.params
  console.log(req)
  if (!fs.existsSync(file)) {
    fs.mkdirSync(dir, (err) => {
      console.log(err);
    });
    const obj = {
      counter: [
        {
          id,
          count: 1
        }
      ]
    }
    fs.writeFileSync(file, JSON.stringify(obj), () => {});
  }else{
  fs.readFile(file, "utf-8", (err, data) => {
    const obj = JSON.parse(data)
    const index = obj.counter.findIndex((el) => el.id === id);
    if (index !== -1) {
      obj.counter[index].count++
    } else {
      obj.counter.push({
        id,
        count: 1
      }) 
    }
    fs.writeFileSync(file, `${JSON.stringify(obj)}`, () => {});  
  });
  }
  res.status(200)
  res.json({})
})

app.get("/:id", (req, res)=>{
  const {id} = req.params
  const obj = JSON.parse(fs.readFileSync(file, 'utf8'));
  const index = obj.counter.findIndex((el) => el.id === id);
    if (index !== -1) {
      res.status(200)
      res.json(obj.counter[index]) 
    } else {
      res.status(401)
      res.json({ id, count: "Данные о просмотрах не найдены"}) 
    }

})

app.listen(PORT, "0.0.0.0", (err) => {
  err
    ? console.log(err)
    : console.log(`Server is listening on http://localhost:${PORT}`);
});
