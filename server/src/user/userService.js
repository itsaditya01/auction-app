const User = require("./userModel");

exports.getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw error;
  }
};

exports.addUser = async (
  firstName,
  lastName,
  email,
  password,
  contactNo,
  profilePhoto
) => {
  try {
    //Create User
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      contactNo,
      profilePhoto,
    });
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};
