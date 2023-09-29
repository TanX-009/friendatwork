var express = require("express");
const Controller = require("../controllers");

var router = express.Router();

let cars = [];

/* GET home page. */
router.post("/addBurger", Controller.addBurger);
router.get("/getAllBurgers", Controller.getAllBurgers);
router.post("/deleteBurger", Controller.deleteBurger);

router.post("/addPizza", Controller.addPizza);
router.get("/getAllPizzas", Controller.getAllPizzas);
router.post("/deletePizza", Controller.deletePizza);

router.post("/addBeverages", Controller.addBeverages);
router.get("/getAllBeverages", Controller.getAllBeverages);
router.post("/deleteBeverage", Controller.deleteBeverage);

module.exports = router;
