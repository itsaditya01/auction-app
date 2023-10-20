const { getUserByEmail, addUser } = require("./userService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { conn } = require("../database/connection");

const secret = process.env.JWT_SECRET;
const tokenLife = process.env.TOKEN_LIFE;

exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    //If user doesn't exists.
    if (!user) {
      const error = new Error("User doesnot exsists.");
      error.code = 404;
      throw error;
    }

    //Comparing password with actucal password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      const error = new Error("Invalid credentials.");
      error.code = 401;
      throw error;
    }

    //Creating JWT auth token
    jwt.sign(
      { id: user._id },
      secret,
      { expiresIn: tokenLife },
      (err, token) => {
        if (err) {
          throw new Error(err.msg);
        } else {
          return res.status(200).json({
            success: true,
            data: { token },
          });
        }
      }
    );
  } catch (error) {
    next(error);
  }
};

exports.Signup = async (req, res, next) => {
  const session = await conn.startSession();
  try {
    const { firstName, lastName, email, password, contactNo, profilePhoto } =
      req.body;
    const hashedPass = await bcrypt.hash(password, 10);

    session.startTransaction();

    //Add user
    const user = await addUser(
      firstName,
      lastName,
      email,
      hashedPass,
      contactNo,
      profilePhoto
    );

    console.log(user);

    //create JWT token
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: tokenLife });

    await session.commitTransaction();

    //sending a response
    res.status(201).json({
      success: true,
      msg: "Registration done successfully.",
      data: {
        token,
        id: user._id,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  }
};
