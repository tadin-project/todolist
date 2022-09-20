import asyncHandler from "express-async-handler";
import { ListModel, MsCategoryModel, MsUserModel } from "../models/index.js";

// @desc    Get all list
// @route   GET /api/list
// @access  Private
export const getList = asyncHandler(async (req, res) => {
  const lists = await ListModel.find({ user: req.user.id });
  return res.status(200).json(lists);
});

// @desc    Get list by id
// @route   GET /api/list/:id
// @access  Private
export const getListById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const list = await ListModel.findById(id);
    return res.status(200).json(list);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

// @desc    add list
// @route   POST /api/list
// @access  Private
export const addList = asyncHandler(async (req, res) => {
  const { list_nama, list_desc, list_deadline, category } = req.body;

  if (!list_nama || !list_desc || !category) {
    res.status(400);
    throw new Error("Name, Description and Category is required!");
  }

  const user = await MsUserModel.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const catData = await MsCategoryModel.findById(category);

  // Check for category
  if (!catData) {
    res.status(401);
    throw new Error("Category not found");
  }

  try {
    const listData = await ListModel.create({
      list_nama,
      list_desc,
      list_status: 0,
      list_deadline,
      category,
      user: req.user.id,
    });
    return res.status(200).json(listData);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @desc    Update list
// @route   PUT /api/list/:id
// @access  Private
export const editList = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { list_nama, list_desc, list_deadline, category } = req.body;

  try {
    const listData = await ListModel.findById(id);
    if (!listData) {
      res.status(400);
      throw new Error("Tasklist was not found!");
    }

    const user = await MsUserModel.findById(req.user.id);

    // Check for user
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    const catData = await MsCategoryModel.findById(category);

    // Check for category
    if (!catData) {
      res.status(401);
      throw new Error("Category not found");
    }

    // Make sure only the logged in user matches the category user
    if (listData.user.toString() !== user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }

    const newList = await ListModel.findByIdAndUpdate(
      id,
      {
        list_nama,
        list_desc,
        list_deadline,
        category,
      },
      {
        new: true,
      }
    );
    return res.status(200).json(newList);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @desc    Delete list
// @route   DELETE /api/list/:id
// @access  Private
export const delList = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const listData = await ListModel.findById(id);

    if (!listData) {
      res.status(400);
      throw new Error("List was not found!");
    }

    const user = await MsUserModel.findById(req.user.id);

    // Check for user
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    // Make sure only the logged in user matches the category user
    if (listData.user.toString() !== user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }

    await listData.remove();
    return res.status(200).json({ id: id });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});
