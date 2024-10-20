const bcrypt = require("bcryptjs");
const userModel = require("../../models/userModel");

async function userSignUpController(req, res) {
  try {
    // Log the incoming request body to ensure it's received correctly
    // console.log("Request Body:", req.body);

    const { email, password, name } = req.body;

    if (!email) {
      throw new Error("Please provide email");
    }
    if (!password) {
      throw new Error("Please provide password");
    }
    if (!name) {
      throw new Error("Please provide name");
    }

    const user = await userModel.findOne({ email });

    if (user) {
      throw new Error("User already exists.");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    const payload = {
      ...req.body,
      role: "GENERAL",
      password: hashPassword,
    };

    const userData = new userModel(payload);
    const saveUser = await userData.save();

    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User created successfully!",
    });
  } catch (err) {
    // console.error("Error during sign-up:", err.message || err);
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;
