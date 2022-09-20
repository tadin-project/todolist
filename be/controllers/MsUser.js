import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { MsUserModel } from "../models/index.js";

// @desc    register User
// @route   POST /api/users
// @access  Private
export const registerUser = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    res.status(400);
    throw new Error("Please add all fields!");
  }

  //   check if user is exists
  const userExists = await MsUserModel.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists!");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await MsUserModel.create({
    email,
    name,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data!");
  }
});

// @desc    login User
// @route   POST /api/users/login
// @access  Private
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields!");
  }

  //   check for user email
  const user = await MsUserModel.findOne({ email });
  //   check if user not exist
  if (!user) {
    res.status(400);
    throw new Error("User is not exists!");
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  if (user && comparePassword) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credential!");
  }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await MsUserModel.findById(req.user.id);
  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

// generate token
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
