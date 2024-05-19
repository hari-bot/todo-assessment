import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    userName: {
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
  },
  { timestamps: true }
);

userSchema.methods.generateJwtToken = function () {
  return jwt.sign({ user: this._id.toString() }, process.env.JWT_SECRET);
};

userSchema.statics.findEmail = async (email) => {
  //Check Existance of email and phoneNumber
  const checkUserByEmail = await userModel.findOne({ email });

  if (checkUserByEmail) {
    throw new Error(`E-mail alredy exist`);
  }

  return false;
};

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(8, (error, salt) => {
    if (error) return next(error);

    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error);

      user.password = hash;
      next();
    });
  });
});

export const userModel = mongoose.model("Users", userSchema);
