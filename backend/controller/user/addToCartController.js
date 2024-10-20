const addToCartModel = require("../../models/cartProduct");

const addToCartController = async (req, res) => {
  try {
    const { productId } = req?.body;
    const currentUser = req.userId;
    const isProductAvailable = await addToCartModel.findOne({
      productId,
      userId: currentUser,
    });
    // console.log("isProductAvailable", isProductAvailable);
    if (isProductAvailable) {
      return res.json({
        message: "Already exists in cart section. Update there",
        error: true,
        success: false,
      });
    }

    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    };
    const newAddToCart = new addToCartModel(payload);
    const saveProduct = await newAddToCart.save();
    return res.json({
      data: saveProduct,
      message: "Product added to the cart succesfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
      error: true,
      success: false,
    });
  }
};

module.exports = addToCartController;
