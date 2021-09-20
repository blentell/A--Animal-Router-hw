const express = require("express");
const router = express.Router();

let animalArray = [
	{ id: 1, animalName: "dog" },
	{ id: 2, animalName: "cat" },
	{ id: 3, animalName: "hamster" },
];

router.get("/", function (req, res) {
	// res.render("index");
	let foundAnimal = null;
	if (Object.keys(req.query).length === 0) {
		res.json(animalArray);
	} else {
		animalArray.forEach((animal) => {			
			if (animal.animalName === req.query.animal) {
				foundAnimal = animal;
				console.log(foundAnimal);
			}
		});
		if (!foundAnimal) {
			return res.send("Animal does not exist!");
		} else {
			return res.json({ foundAnimal });
		}
	}
});

router.get("/get-animals-by-params-id/:id", function (req, res) {
	console.log(req.params);
	console.log(req.params.id);
	console.log(req.params.id);
	let foundAnimal;
	animalArray.forEach((team) => {
		if (animal.id === +req.params.id) {
			foundAnimal = animal;
		}
	});

	res.json({
		foundTeam,
		id: req.params.id,
	});
});

router.get("/get-animals-by-params-name/:name", function (req, res) {
	console.log(req.params);
	console.log(req.params.name);
	let foundName;
	animalArray.forEach((animal) => {
		if (animal.animalName === req.params.name) {
			foundName = animal;
		}
	});
	res.json({ foundName, animalName: req.params.name });
});

router.post("/", function (req, res) {
	// res.send("post path!");
	console.log(req.body);
	animalArray.push(req.body);
	res.json({ animal: animalArray });
});

router.put("/get-animals-by-params-name/:name/:newName", function (req, res) {
	let foundAnimal = null;
	animalArray.forEach((animal) => {
		if (animal.animalName === req.params.name) {
			foundAnimal = animal;
			animal.animalName = req.params.newName;
		}
	});
	if (!foundAnimal) {
		res.send("Please check your spelling.");
	} else {
		res.json({ animalArray, message: "Successfully updated!" });
	}
});

router.delete("/get-animals-by-params-name/:name", function (req, res) {
	let foundAnimal = null;
	animalArray.forEach((animal, index) => {
		if (animal.animalName === req.params.name) {
			foundAnimal = animal;
			animalArray.splice(index, 1);
		}
	});
	if (!foundAnimal) {
		res.send("Please check your spelling.");
	} else {
		res.json({ animalArray, message: "Successfully deleted!" });
	}
});

module.exports = router;
