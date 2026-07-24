import bcrypt from "bcrypt";
import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, userName, password } = req.body;
    const name = username || userName;

    if (!name || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const existingUser = await User.findOne({ userName: name });
    if (existingUser) {
      return res.status(409).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      userName: name,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({
      message: "User registered successfully!",
      user: { userName: newUser.userName, id: newUser._id },
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });

    if (!user || !password) {
      return res
        .status(400)
        .json({ error: "Username and passowrd are required" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const payload = {
      id: user._id,
      username: user.userName,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successfull", token });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};
