import { User } from "../models/User.js";
import { sendToken } from "../utils/jwtToken.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    sendToken(user, res, 201);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Register error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    sendToken(user, res, 200);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Login error" });
  }
};

export const logout = (req, res) => {
  const isProduction = process.env.IS_PRODUCTION === "true";

  res
    .clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    })
    .status(200)
    .json({ success: true, message: "Logged out successfully" });
};

// routes/authRoutes.js or similar
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password")
    res.json({ success: true, user })
  } catch (err) {
    res.status(401).json({ success: false })
  }
}