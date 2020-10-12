const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    default: 0,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("This is not an email");
    },
  },
  password: {
    type: String,
    trim: true,
    minlength: 7,
    required: true,
    validate(value) {
      if (value.toLowerCase().includes("password"))
        throw new Error(`password can not be "password`);
    },
  },
});

userSchema.pre("save", async function (end) {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 8);
  end();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
