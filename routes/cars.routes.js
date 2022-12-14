// Archivo character.routes.js dentro de la carpeta routes
const express = require("express");
const cors = require('cors');
app.use(cors());
const mongoose = require("mongoose");
const Car = require("../models/Car");
const filesMiddleware = require("../middlewares/files.middleware");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const cars = await Car.find();
    return res.status(200).json(cars);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const car = await Car.findById(id);
    if (car) {
      return res.status(200).json(car);
    } else {
      return res.status(404).json("Car not found with this id");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/modelo/:modelo", async (req, res) => {
  const { modelo } = req.params;

  try {
    const carModelo = await Car.find({ modelo: modelo });
    return res.status(200).json(carModelo);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.put('/:id', async (req, res, next) => {
	try {
	  const { id } = req.params;
	  const carEdit = new Car(req.body);
	  carEdit._id = id;
	  const car = await Car.findByIdAndUpdate(id, carEdit);
	  if (car) {
		return res.status(200).json(carEdit);
	  } else {
		return res.status(404).json('No car found');
	  }
	} catch (error) {
	  return next(error);
	}
  });
  

router.get("/marca/:marca", async (req, res) => {
  const { marca } = req.params;

  try {
    const carMarca = await Car.find({ marca: marca });
    return res.status(200).json(carMarca);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/create", [filesMiddleware.upload.single("foto"), filesMiddleware.uploadToCloudinary],
  async (req, res, next) => {
    try {
      const cloudinaryUrl = req.file_url ? req.file_url : null;
      const { marca, modelo, potencia, mercado = "Europeo" } = req.body;
      const car = {
        marca,
        modelo,
        potencia,
        mercado,
        foto: cloudinaryUrl,
      };
      const newCar = new Car(car);
      const createdCar = await newCar.save();
      return res.status(201).json(createdCar);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Car.findByIdAndDelete(id);
    return res.status(200).json("Car deleted");
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
