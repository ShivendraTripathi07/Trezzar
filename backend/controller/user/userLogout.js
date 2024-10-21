const userLogout = async (req, res) => {
  try {
    // Define the options for the cookie
    const tokenOption = {
      httpOnly: true, // The cookie cannot be accessed via JavaScript
      secure: process.env.NODE_ENV === "production", // Only use secure cookies in production (over HTTPS)
      sameSite: 'None', // Required when using secure cookies across different domains
    };

    // Clear the token cookie with the defined options
    res.clearCookie("token", tokenOption);

    // Send a success response
    return res.json({
      message: "Logged Out Successfully",
      error: false,
      success: true,
      data: [],
    });
  } catch (err) {
    // Error handling
    return res.status(500).json({
      message: err.message || "An error occurred during logout.",
      error: true,
      success: false,
    });
  }
};

module.exports = userLogout;
