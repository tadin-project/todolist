import asyncHandler from "express-async-handler";
import { MsCategoryModel, MsUserModel } from "../models/index.js";

// @desc    Get categories
// @route   GET /api/category
// @access  Private
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await MsCategoryModel.find({ user: req.user.id });
  return res.status(200).json(categories);
});

// @desc    Get categories by id
// @route   GET /api/category/:id
// @access  Private
export const getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const cat = await MsCategoryModel.findById(id);
    return res.status(200).json(cat);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

// @desc    add category
// @route   POST /api/category
// @access  Private
export const addCategory = asyncHandler(async (req, res) => {
  const { cat_nama, cat_status, cat_desc } = req.body;

  if (!cat_nama) {
    res.status(400);
    throw new Error("Name is required!");
  }

  if (!cat_status) {
    res.status(400);
    throw new Error("Status is required!");
  }

  const user = await MsUserModel.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  try {
    const catId = await MsCategoryModel.create({
      cat_desc,
      cat_nama,
      cat_status,
      user: req.user.id,
    });
    return res.status(200).json(catId);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @desc    Update category
// @route   PUT /api/category
// @access  Private
export const editCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const catData = await MsCategoryModel.findById(id);
    if (!catData) {
      res.status(400);
      throw new Error("Category was not found!");
    }

    const user = await MsUserModel.findById(req.user.id);

    // Check for user
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    // Make sure only the logged in user matches the category user
    if (catData.user.toString() !== user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }

    const newCat = await MsCategoryModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(newCat);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @desc    Delete category
// @route   DELETE /api/category
// @access  Private
export const delCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const catData = await MsCategoryModel.findById(id);

    if (!catData) {
      res.status(400);
      throw new Error("Category was not found!");
    }

    const user = await MsUserModel.findById(req.user.id);

    // Check for user
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    // Make sure only the logged in user matches the category user
    if (catData.user.toString() !== user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }

    await catData.remove();
    return res.status(200).json({ id: id });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});
