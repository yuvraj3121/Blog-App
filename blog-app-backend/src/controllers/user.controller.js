import { User } from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

const signUpUser = async (req, res) => {
  const { userName, fullName, phoneNumber, email, password } = req.body;

  if (!userName || !fullName || !phoneNumber || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const user = await User.create({
      userName,
      fullName,
      phoneNumber,
      email,
      password,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        userName: user.userName,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
};

const loginUser = async (req, res) => {
  const { userName, email, password } = req.body;

  if ((!userName && !email) || !password)
    return res
      .status(400)
      .json({ error: "Username or email and password are required" });

  try {
    const user = await User.findOne({
      $or: [{ userName: userName }, { email: email }],
    });

    if (!user) return res.status(400).json({ error: "Invalid credentials" });
    console.log(1);

    const isPasswordvalid = user && (await user.comparePassword(password));
    if (!isPasswordvalid)
      return res.status(400).json({ error: "Invalid credentials" });

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        userName: user.userName,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getUserProfile = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Error fetching user profile" });
  }
};

const updateUserProfile = async (req, res) => {
  const { userName, fullName, phoneNumber, email, newPassword } = req.body;

  if (!userName || !fullName || !phoneNumber || !email) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.userName = userName;
    user.fullName = fullName;
    user.phoneNumber = phoneNumber;
    user.email = email;

    if (newPassword) {
      user.password = newPassword;
    }

    await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating user." });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");

    res.status(200).json({
      message: "Users fetched successfully.",
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching users." });
  }
};

export {
  signUpUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
};
