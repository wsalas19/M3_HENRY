var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});

let obj = {
	name: "",
	lastName: "",
};

let fnc = (a) => {
	return console.log("Hola" + a);
};

let arr = [1, "string", true, null, undefined];

module.exports = router;
