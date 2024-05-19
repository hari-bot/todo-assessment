import { userModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  try {
    const { email, password, userName } = req.body.credentials;

    if (!email || !password || !userName) {
      return res.status(400).json({ error: "All fields are required" });
    }

    await userModel.findEmail(email);

    const newUser = await userModel.create(req.body.credentials);

    const token = newUser.generateJwtToken();

    return res
      .status(200)
      .json({ token, userID: newUser._id, userName: newUser.userName });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = user.generateJwtToken();

    return res
      .status(200)
      .json({ token, userID: user._id, userName: user.userName });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
