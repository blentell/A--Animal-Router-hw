const express = require("express");
const router = express.Router();

let animalArray = [
	{ id: 1, animalName: "dog" },
	{ id: 2, animalName: "cat" },
	{ id: 3, animalName: "hamster" },
];

/* example: ?animalType=dog */
router.get("/", function (req, res, next) {
	let foundAnimal = null;
	if (Object.keys(req.query).length === 0) {
		res.json({ animals });
	} else {
		animals.forEach((animal) => {
			if (animal.animalType === req.query.animalType.toLowerCase()) {
				foundAnimal = animal;
			}
		});
		if (!foundAnimal) {
			return res.status(404).json({ message: "Animal does not exist!" });
		} else {
			return res.json({ message: "success", foundAnimal });
		}
	}
});

/* example: /2 */
router.get("/get-animals-by-params-id/:id", function (req, res) {
	let foundAnimal;
	animals.forEach((animal) => {
		if (animal.id === +req.params.id) {
			foundAnimal = animal;
		}
	});
	if (!foundAnimal) {
		return res.status(404).json({ message: "Index does not exist." });
	} else {
		res.json({
			foundAnimal,
			id: req.params.id,
		});
	}
});

/* example: /cat */
router.get("/get-animals-by-params-name/:name", function (req, res) {
	let foundName;
	animals.forEach((animal) => {
		if (animal.animalType === req.params.name) {
			foundName = animal;
		}
	});
	if (!foundName) {
		return res.status(404).json({ message: "Index does not exist." });
	} else {
		res.json({
			foundName,
			animalType: req.params.name,
		});
	}
});

/* example: /2 */
router.post("/create-new-animal", function (req, res) {
	const { id, animalType } = req.body;

	let duplicatedAnimal = false;

	animals.forEach(function (item) {
		if (item.animalType === animalType) {
			duplicatedAnimal = true;
		}
	});
	if (duplicatedAnimal) {
		res
			.status(409)
			.json({ message: "Animal already exists! Pick another one." });
	} else {
		animals.push({ id, animalType });
		res.json({ message: "animal created", animal: { id, animalType } });
	}
});

/* example: /2/monkey */
router.put("/update-animal/:id", function (req, res) {
  const { id } = req.params;
  const { animalType } = req.body;
	let foundAnimal = false;
	animals.forEach(function (animal) {
		if (animal.id === +req.params.id) {
      foundAnimal = true;
      animal.animalType = animalType;
		}
	});
	if (foundAnimal) {  
    res.json({ message: `Animal with id:${id} updated`, animals });
  } else {
    res.status(404).json({ message: "ID does not exist", animals });
  }
});

/* example: /2 */
router.delete("/delete-animal/:id", function (req, res) {
	let foundIndex = null;
	animals.forEach((animal, index) => {
		if (animal.id === +req.params.id) {
			foundIndex = index;			
		}
	});
	if (!foundIndex) {
    res.status(409).json({ message: "ID does not exist, try again.", animals });
	} else {
    animals.splice(foundIndex, 1);
    res.json({ animals, message: "Successfully deleted!" });
	}
});

module.exports = router;
