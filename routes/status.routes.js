const express = require("express");
const Status = require("../models/Status");
const router = express.Router();

router.post("/create", async (req, res, next) => {
  try {
    const newStatus = new Status({
      status: req.body.status,
      km: req.body.km,
      cars: [],
    });
    const createdStatus = await newStatus.save();
    return res.status(201).json(createdStatus);
  } catch (error) {
    next(error);
  }
});

router.put("/add-car", async (req, res, next) => {
  try {
    const { statusId } = req.body;
    const { carId } = req.body;
    const updatedLocation = await Location.findByIdAndUpdate(
      locationId,
      { $push: { characters: characterId } },
      { new: true }
    );
    return res.status(200).json(updatedLocation);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
