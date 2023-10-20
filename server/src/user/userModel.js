
const mongoose  = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  profilePhoto: {
    data: Buffer,
    contentType: String,
  },
  auctionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auction",
  },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
