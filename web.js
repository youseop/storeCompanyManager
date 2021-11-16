const express = require("express");
const app = express();
const port = 8001;
const mongoose = require("mongoose");
const companyRoutes = require("./routes/comapny");
const db_config = require('./config/db-config.json')


mongoose.connect(db_config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("index");
});
app.use("/company", companyRoutes);

app.listen(port, () => {
  console.log("Server has been started!");
});
