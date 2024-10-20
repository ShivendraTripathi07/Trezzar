const OrderModel = require("./../../models/orderModel");

const getTotalOrdersByDate = async (req, res) => {
  try {
    const { date, category } = req.query; // Get date and category from query params if needed

    // Aggregating orders by date and summing up the total quantities for each product
    const orders = await OrderModel.aggregate([
      {
        // Match based on date if provided
        $match: date
          ? {
              $expr: {
                $eq: [
                  { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                  date,
                ],
              },
            }
          : {},
      },
      {
        $unwind: "$products",
      },
      {
        $lookup: {
          from: "products", // Link to the Product collection
          localField: "products.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails",
      },
      {
        // Optionally match based on category if provided
        $match: category ? { "productDetails.category": category } : {},
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            productId: "$productDetails._id",
          },
          productName: { $first: "$productDetails.productName" },
          category: { $first: "$productDetails.category" },
          totalQty: { $sum: "$products.quantity" },
          totalPrice: {
            $sum: {
              $multiply: ["$products.quantity", "$productDetails.sellingPrice"],
            },
          },
        },
      },
      {
        $group: {
          _id: "$_id.date",
          orders: {
            $push: {
              productName: "$productName",
              category: "$category",
              totalQty: "$totalQty",
              totalPrice: "$totalPrice",
            },
          },
          totalQuantity: { $sum: "$totalQty" }, // Sum total quantity for the date
          totalPrice: { $sum: "$totalPrice" }, // Sum total price for the date
        },
      },
      {
        $sort: { _id: -1 }, // Sort by date in descending order
      },
    ]);

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching total orders by date:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch total orders by date",
    });
  }
};

module.exports = {
  getTotalOrdersByDate,
};
