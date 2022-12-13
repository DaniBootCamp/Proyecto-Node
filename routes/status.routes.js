const express = require("express");
const Status = require("../models/Status");
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
      const status = await Status.find().populate('cars');
      return res.status(200).json(status)
  } catch (error) {
      return next(error)
  }
});


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

router.put('/add-car', async (req, res, next) => {
  try {
      const { statusId } = req.body;
      const { carId } = req.body;
      const updatedStatus = await Status.findByIdAndUpdate(
          statusId,
          { $push: { cars: carId } },
          { new: true }
      );
      return res.status(200).json(updatedStatus);
  } catch (error) {
      return next(error);
  }
});


module.exports = router;
