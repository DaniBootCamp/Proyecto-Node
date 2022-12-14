
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const carSchema = new Schema( //SCHEMA DE CAR
  {
    marca: { type: String, required: true },
    modelo: { type: String },
    potencia: { type: Number },
    km: { type: Number },
    mercado: {
      type: String,
      enum: ["Americano", "Europeo", "Japonés"],
      required: true,
    },
    foto: { type: String },
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.model("Car", carSchema);
module.exports = Car;
