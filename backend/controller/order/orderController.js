// controllers/orderController.js
// const Order = require("../models/Order");
const OrderModel =require("./../../models/orderModel")
// Create a new order
const createOrder = async (req, res) => {
  const { products, totalQty, totalPrice } = req.body;
  const userId = req.userId;

  try {
    const newOrder = new OrderModel({
      userId,
      products,
      totalQty,
      totalPrice,
    });

    await newOrder.save();
    res
      .status(201)
      .json({ success: true, message: "Order created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Order creation failed" });
  }
};

// Get all orders for the logged-in user
const getOrders = async (req, res) => {
  const userId = req.userId;

  try {
    const orders = await OrderModel.find({ userId }).populate("products.productId");
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

module.exports = {
  createOrder,
  getOrders,
};
