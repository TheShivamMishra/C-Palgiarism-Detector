const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { PythonShell } = require("python-shell");
const pyshell = new PythonShell("my_script.py");
const codeParse = require(__dirname + "/codeParser.js"); // file for parsing the C++ code.

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  // Rendering the Get Request of Server

  let date = new Date();
  var option = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  date = date.toLocaleDateString("en-US", option);

  res.render("index.ejs", {
    dayOfweek: date,
  });
});

app.post("/", (req, res) => {
  //Handling the Post request to the Server.

  var code1 = req.body.code1;
  var code2 = req.body.code2;

//   console.log(code1);
//   console.log(code2);

  pyshell.send([code1, code2]);

  pyshell.on("message", function (msg) {
    console.log(msg);
  });

  pyshell.end(function (err, code, signal) {
    if (err) throw err;
    console.log("finished");
  });

  res.send("<h1>Data is Processing</h1>");
});

app.listen("3000", () => {
  //Port listing on 30000
  console.log("Server is Running on Port 3000");
});
