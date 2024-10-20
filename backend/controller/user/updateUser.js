const userModel = require("../../models/userModel");


async function updateUser(req, res) {
  try {
    // console.log("userId ", req.userId);
    const sessionUser = req.userId;
    const { userId, email, name, role } = req.body;
    const payload = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(role && { role: role }),
    };

    const user = await userModel.findById(sessionUser);
    // console.log(user.role);
    const updateUser = await userModel.findByIdAndUpdate(userId, payload);
    // if(updateUser)
    res.json({
      message: " User",
      data: updateUser,
      error: false,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
      error: true,
      success: false,
    });
  }
}
module.exports = updateUser;
