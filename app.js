const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const fs = require("fs");
const { PythonShell } = require("python-shell");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

let date = new Date();
var option = {
  weekday: "long",
  day: "numeric",
  month: "long",
};

date = date.toLocaleDateString("en-US", option);

app.get("/", (req, res) => {
  // Rendering the Get Request of Server

  res.render("index.ejs", {
    dayOfweek: date,
  });
});

app.post("/", (req, res) => {
  //Handling the Post request to the Server.

  var code1 = req.body.code1;
  var code2 = req.body.code2;

  fs.writeFileSync("doc1.txt", code1, function (err) {
    if (err) console.log("Some error while writing into the file");
  });

  fs.writeFileSync("doc2.txt", code2, function (err) {
    if (err) console.log("Some error while writing into the file");
  });

  //   console.log(code1);
  //   console.log(code2);

  let options = {
    mode: "text",
    pythonOptions: ["-u"],
    // args: [code1, code2],
  };

  PythonShell.run("./my_script.py", options, function (err, results) {
    if (!err) {
      // console.log(results);
      res.render("output", {
        dayOfweek: date,
        p: results,
      });
    } else res.send("<h1>Oops something is wrong!</h1>");
  });
});

app.listen("3000", () => {
  //Port listing on 30000
  console.log("Server is Running on Port 3000");
});
