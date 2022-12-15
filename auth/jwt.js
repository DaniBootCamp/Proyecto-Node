const User = require("../models/User");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");


// Codificamos las operaciones que se podran realizar con relacion a los usuarios
const createUser = async (req, res, next) => {
  try {
    const newUser = new User();
    newUser.email = req.body.email;
    const pwdHash = await bcrypt.hash(req.body.password, 10);
    newUser.password = pwdHash;


    
    const userDb = await newUser.save();
    
    //Pnt. mejora: autenticar directamente al usuario

    return res.json({
      status: 201,
      message: 'User Created Correctly',
      data: userDb
    });
  } catch (err) {
    return next(err);
  }
}

const authenticate = async (req, res, next) => {
  try {
    //Buscamos al user en bd
    const userInfo = await User.findOne({ email: req.body.email })
    //Comparamos la contraseña
    if (bcrypt.compareSync(req.body.password, userInfo.password)) {
      //eliminamos la contraseña del usuario
      userInfo.password = null
      //creamos el token con el id y el name del user
      const token = jwt.sign(
        {
          id: userInfo._id,
          name: userInfo.name
        },
        req.app.get("secretKey"),
        { expiresIn: "1h" }
      );
      //devolvemos el usuario y el token.
      return res.json({
        status: 200,
        message: 'Logued',
        data: { user: userInfo, token: token },
      });
    } else {
      return res.json({ status: 400, data: null });
    }
  } catch (err) {
    return next(err);
  }
}
//funcion logout, iguala el token a null.
const logout = (req, res, next) => {
  try {
    return res.json({
      status: 200,
      message: 'Logout Correctly',
      token: null
    });
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  createUser,
  authenticate,
  logout
}