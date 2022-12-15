const User = require("../models/User");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
//creacion de User
const createUser = async (req, res, next) => {
  try {
    const newUser = new User();
    newUser.email = req.body.email;
    const pwdHash = await bcrypt.hash(req.body.password, 10);
    newUser.password = pwdHash;
    const result = await User.exists({ email: newUser.email });
    if (result) {
      return res.status(404).json('Already used');
    } else { 
    const userDb = await newUser.save();
    }
    return res.json({
      status: 201,
      message: 'User Created Correctly',
      data: userDb
    });
  } catch (err) {
    return next(err);
  }
}
// Login de user
const authenticate = async (req, res, next) => {
  try {
    const userInfo = await User.findOne({ email: req.body.email })
    if (bcrypt.compareSync(req.body.password, userInfo.password)) {
      userInfo.password = null
      const token = jwt.sign(
        {
          id: userInfo._id,
          name: userInfo.name
        },
        req.app.get("secretKey"),
        { expiresIn: "1h" }
      );
      return res.json({
        status: 200,
        message: 'Logued',
        data: { user: userInfo, token: token },
      });
    } else {
      return res.json({ status: 400, message: 'bad password', data: null });
    }
  } catch (err) {
    return next(err);
  }
}
// Logout de user
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