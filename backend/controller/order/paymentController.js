const userModel = require("../../models/userModel");
const stripe = require("./../../config/stripe");

const paymentController = async (req, res) => {
  try {
    const { cartItems } = req.body;
    // console.log("cartItems", cartItems);
    const user = await userModel.findOne({ _id: req.userId });
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [
        {
          shipping_rate: "shr_1PMkhpSAq8kJSdzM64YIpKFo",
        },
      ],
      customer_email: user.email,
      line_items: cartItems.map((item, index) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.productId.productName,
              images: item.productId.productImage,
              metadata: {
                productId: item.productId._id,
              },
            },
            unit_amount: item.productId.sellingPrice * 100,
          },
          adjustable_quantity:{
            enabled:true,
            minimum:1
          },
          quantity:item.quantity
        };
      }),
      success_url:`${process.env.FRONTEND_URL}/success`,
      cancel_url:`${process.env.FRONTEND_URL}/cancel`
    };

    const session = await stripe.checkout.sessions.create(params);
    res.status(303).json(session);
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
module.exports = paymentController;