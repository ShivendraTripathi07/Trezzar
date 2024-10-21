import React, { useEffect, useState } from "react";
import {
  ShoppingBag,
  Package,
  Calendar,
  CreditCard,
  Truck,
} from "lucide-react";
import displayINRCurrency from "../helpers/displayCurrency";
import SummaryApi from "../common";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.getOrder.url, {
        method: SummaryApi.getOrder.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      const responseData = await response.json();
      console.log(responseData)
      if (responseData.success) {
        setOrders(responseData.orders);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const totalQuantity = orders.reduce((acc, order) => acc + order.totalQty, 0);
  const totalPrice = orders.reduce((acc, order) => acc + order.totalPrice, 0);
  const uniqueCategories = [
    ...new Set(
      orders.flatMap((order) =>
        order.products.map((product) => product.productId.category)
      )
    ),
  ];

  const OrderSummaryCard = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full">
      <div className="bg-blue-600 px-6 py-4">
        <h3 className="font-semibold text-xl text-white">Order Summary</h3>
      </div>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-600 font-medium">
                Total Orders
              </span>
              <ShoppingBag className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-900 mt-2">
              {orders.length}
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-600 font-medium">
                Total Items
              </span>
              <Package className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-900 mt-2">
              {totalQuantity}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600 font-medium">Order Value</span>
            <CreditCard className="w-5 h-5 text-gray-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {displayINRCurrency(totalPrice)}
          </p>
          <div className="mt-2 text-sm text-gray-500">
            Average order value:{" "}
            {displayINRCurrency(totalPrice / (orders.length || 1))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">
            Ordered Categories
          </h4>
          <div className="flex flex-wrap gap-2">
            {uniqueCategories.map((category, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <div className="lg:w-2/3">
            <div className="flex items-center space-x-3 mb-6">
              <ShoppingBag className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">Your Orders</h2>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No Orders Found
                </h3>
                <p className="text-gray-500">
                  Looks like you haven't placed any orders yet.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {orders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                  >
                    <div className="border-b border-gray-100 bg-gray-50 p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 text-gray-400" />
                          <h3 className="font-medium text-gray-900">
                            Order #{order._id}
                          </h3>
                        </div>
                        <div className="mt-2 md:mt-0 flex items-center space-x-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            Delivered
                          </span>
                          <div className="flex items-center text-gray-500">
                            <Truck className="w-5 h-5 mr-2" />
                            <span className="text-sm">Estimated: 2-3 days</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {order.products.map((product) => (
                          <div
                            key={product._id}
                            className="flex bg-white rounded-lg border border-gray-100 overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-md"
                          >
                            <div className="w-1/3 bg-gray-50 p-4 flex items-center justify-center">
                              <img
                                src={product.productId.productImage[0]}
                                className="object-contain w-full h-32 transition-transform hover:scale-110"
                                alt={product.productId.productName}
                              />
                            </div>
                            <div className="w-2/3 p-4">
                              <h4 className="font-medium text-gray-900 mb-1 line-clamp-1">
                                {product.productId.productName}
                              </h4>
                              <p className="text-sm text-gray-500 capitalize mb-2">
                                {product.productId.category}
                              </p>
                              <div className="space-y-1">
                                <p className="text-lg font-medium text-blue-600">
                                  {displayINRCurrency(
                                    product.productId.sellingPrice
                                  )}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Quantity: {product.quantity}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <OrderSummaryCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
