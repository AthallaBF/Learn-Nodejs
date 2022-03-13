const Joi = require("joi");
const express = require("express");
const route = express.Router();

const courses = [{ id: 1, name: "course1" }];
const validateCourse = (courseObj) => {
	// create a schema and a requirements
	const schema = Joi.object({
		name: Joi.string().min(3).required(),
	});

	// validate a response by matching it with our schema
	const { error } = schema.validate(courseObj);
	if (error) {
		res.status(400).send(error.details[0].message);
		return;
	}
};

// set up route handlers
route.get("/", (req, res) => {
	res.send([1, 2, 3]);
});

// POST request
route.post("/", (req, res) => {
	const schema = Joi.object({
		name: Joi.string().min(3).required(),
	});

	const result = schema.validate(req.body);
	console.log(result);
	if (result.error) {
		res.status(400).send(result.error.details[0].message);
		return;
	}

	const course = {
		id: courses.length + 1,
		name: req.body.name,
	};

	courses.push(course);
	res.send(courses);
});

// getting an id
route.get("/:id", (req, res) => {
	const course = courses.find((c) => c.id === parseInt(req.params.id)); // parseint untuk ngubah jadi integer
	if (!course)
		res.sendStatus(404).send("the page with the given id does not exist");
	console.log(course.id);
	res.send(course.name);
});
// app.get("/api/courses/:year/:month", (req, res) => {
// 	res.send(req.query); // query bisa dipake optional, contoh /api/courses/2020/11?sortby=name setelah tanda tanya itu query
// });

// update a certain id
route.put("/:id", (req, res) => {
	// check if the requested id exist
	const course = courses.find((c) => c.id === parseInt(req.params.id));
	if (!course) {
		// if it doesn't then send a 404 response error
		res.status(404).send("the page with the given id does not exist");
		return;
	}
	console.log(course);
	// create a schema and a requirements
	validatecourse(req.body);

	console.log("courese yang tiga");
	// if the requested id exist, then update it
	course.name = req.body.name;
	res.send(course);
});

// delete an id
route.delete("/:id", (req, res) => {
	const course = courses.find((c) => c.id === parseInt(req.params.id));
	if (!course) {
		return res.status(404).send("the course with the given id does not exist");
	}

	const index = courses.indexOf(course);
	courses.splice(index, 1); // method splice buat remove an element in array
	res.send(course);
});

module.exports = route;
