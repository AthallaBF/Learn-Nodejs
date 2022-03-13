// import express modules
const debugNgopi = require("debug")("app:ngopi");
const helmet = require("helmet");
const Joi = require("joi");
const express = require("express");
const logger = require("./logger");
const config = require("config");
const mongoose = require("mongoose");
const router = require("./routes/courses");

// set up a port
const port = process.env.PORT || 3000;

// create express app
const app = express();

// connect to mongodb
const dbURI =
	"mongodb://athallabf:fidocakep@cluster0-shard-00-00.h5vj5.mongodb.net:27017,cluster0-shard-00-01.h5vj5.mongodb.net:27017,cluster0-shard-00-02.h5vj5.mongodb.net:27017/rest-apis?ssl=true&replicaSet=atlas-upownf-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose
	.connect(dbURI)
	.then(() => {
		console.log("mongodb connected");
	})
	.catch((err) => console.log(err));

// listen to request
app.listen(port, () => {
	console.log(`server running on port ${port}...`);
});

// set up templating engine
app.set("view engine", "pug");

if (app.get("env") === "production") {
	debugNgopi("Debug ngopi enabled..");
}

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // buat nerima form POST
app.use(express.static("public"));
app.use(helmet());

// configuration using config module
console.log(`environment name: ${config.get("name")}`);
console.log(`mail server name: ${config.get("mail.host")}`);
// console.log(`mail password name: ${config.get("mail.password")}`);

// app.get("env"); // by default it will be 'development'
// process.env.NODE_ENV; kalo gk di define bakalan undefined
// tujuannya buat ngasih tau kita lagi di environment production atau development

app.use(logger);

app.get("/", (req, res) => {
	res.redirect("/api/courses");
});

app.use("/api/courses", router);
