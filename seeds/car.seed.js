const mongoose = require("mongoose");
const { DB_URL } = require("../utils/db");

const Car = require("../models/Car");

const carList = [
  {
    marca: "Ford",
    modelo: "Mustang GT 500",
    potencia: 650,
    km: 237,
    mercado: "Americano",
  },
  {
    marca: "Toyota",
    modelo: "GT86",
    potencia: 200,
    km: 233217,
    mercado: "Japonés",
  },
  {
    marca: "BMW",
    modelo: "M4 Competition",
    potencia: 450,
    km: 12317,
    mercado: "Europeo",
  },
  {
    marca: "Mercedes Benz",
    modelo: "Clase E AMG C63",
    potencia: 650,
    km: 417,
    mercado: "Europeo",
  },
  {
    marca: "Audi",
    modelo: "RS6",
    potencia: 550,
    km: 3327,
    mercado: "Europeo",
  },
  {
    marca: "Fiat",
    modelo: "500 Abarth",
    potencia: 218,
    km: 52127,
    mercado: "Europeo",
  },
  {
    marca: "Renaul",
    modelo: "Megane RS",
    potencia: 310,
    km: 6547,
    mercado: "Europeo",
  },
  {
    marca: "Renaul",
    modelo: "Clio RS",
    potencia: 192,
    km: 6547,
    mercado: "Europeo",
  },
  {
    marca: "Audi",
    modelo: "RS4",
    potencia: 310,
    km: 6547,
    mercado: "Europeo",
  },
  {
    marca: "Nissan",
    modelo: "Juke",
    potencia: 190,
    km: 6547,
    mercado: "Japonés",
  },
  {
    marca: "Volskwagen",
    modelo: "Golf R",
    potencia: 440,
    km: 72141,
    mercado: "Europeo",
  },
];

const carDocuments = carList.map((item) => new Car(item));

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const allCars = await Car.find();

    if (allCars.length) {
      await Car.collection.drop();
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
    await Car.insertMany(carDocuments);
  })
  .catch((err) => console.log(`Error creating data: ${err}`))
  .finally(() => mongoose.disconnect());
