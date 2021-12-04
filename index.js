const express = require("express");
const PORT = process.env.PORT || 8007;
const app = express();
const fs = require("fs").promises;

// Don't worry about these 4 lines below
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  fs.readFile("./database.json", "utf8")
    .then((content) => JSON.parse(content))
    .then((obj) => console.log(obj.users))
    .catch((err) => console.log(err));
  res.render("createcard");
});

app.post("/create", (req, res) => {
  // console.log(req.body);
  fs.readFile("./database.json", "utf-8")
    .then((content) => JSON.parse(content))
    // .then((obj) => obj.users.push(req.body))
    .then(() => fs.writeFile("./database.json", JSON.stringify(req.body)))
    .catch((err) => console.log(err));
  res.render("homepage", {object: req.body});
});

app.get("/people/:id", (req, res) => {
  var id = req.params.id;

  res.render("people", {});
});

app.get("/:id/photos", (req, res) => {
  const id = req.params.id;
});

app.listen(PORT, () => {
  console.log(`Server now is running at http://localhost:${PORT} 🚀`);
});
