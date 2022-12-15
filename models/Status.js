const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statusSchema = new Schema( //SCHEMA STATUS CAR
  {
    status: { type: String, enum: ["Nuevo", "Segunda-mano"], required: true },
    cars: [{ type: mongoose.Types.ObjectId, ref: "Car" }],
  },
  {
    timestamps: true,
  }
);

const Status = mongoose.model("Status", statusSchema);
module.exports = Status;
