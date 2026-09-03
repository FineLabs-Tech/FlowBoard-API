const asyncHandler = require("../middleware/asyncHandler");
const { ApiError } = require("../middleware/errorMiddleware");

// In-memory data store (swap this for a real database later)
let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];
let nextId = 3;

// @route  GET /api/users
const getUsers = asyncHandler(async (req, res) => {
  res.json({ success: true, data: users });
});

// @route  GET /api/users/:id
const getUserById = asyncHandler(async (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) throw new ApiError(404, "User not found");
  res.json({ success: true, data: user });
});

// @route  POST /api/users
const createUser = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) throw new ApiError(400, "Name is required");

  const newUser = { id: nextId++, name };
  users.push(newUser);
  res.status(201).json({ success: true, data: newUser });
});

// @route  PUT /api/users/:id
const updateUser = asyncHandler(async (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) throw new ApiError(404, "User not found");

  const { name } = req.body;
  if (name) user.name = name;
  res.json({ success: true, data: user });
});

// @route  DELETE /api/users/:id
const deleteUser = asyncHandler(async (req, res) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (index === -1) throw new ApiError(404, "User not found");

  users.splice(index, 1);
  res.json({ success: true, message: "User deleted" });
});

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
