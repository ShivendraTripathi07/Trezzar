import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Lock, X, CreditCard } from "lucide-react";
const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal state
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });

  const context = useContext(Context);
  const navigate = useNavigate();

  const loadingCart = new Array(4).fill(null);

  const fetchData = async () => {
    try {
      const response = await fetch(SummaryApi.addToCartProductView.url, {
        method: SummaryApi.addToCartProductView.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });

      const responseData = await response.json();
      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      console.error("Failed to fetch cart data:", error);
    }
  };

  useEffect(() => {
    const loadCart = async () => {
      setLoading(true);
      await fetchData();
      setLoading(false);
    };

    loadCart();
  }, []);

  const increaseQty = async (id, qty) => {
    try {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty + 1,
        }),
      });

      const responseData = await response.json();
      if (responseData.success) {
        fetchData();
      }
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const decreaseQty = async (id, qty) => {
    if (qty >= 1) {
      try {
        const response = await fetch(SummaryApi.updateCartProduct.url, {
          method: SummaryApi.updateCartProduct.method,
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            _id: id,
            quantity: qty - 1,
          }),
        });

        const responseData = await response.json();
        if (responseData.success) {
          fetchData();
        }
      } catch (error) {
        console.error("Failed to update quantity:", error);
      }
    }
  };

  const deleteCartProduct = async (id) => {
    try {
      const response = await fetch(SummaryApi.deleteCartProduct.url, {
        method: SummaryApi.deleteCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
        }),
      });

      const responseData = await response.json();
      if (responseData.success) {
        fetchData();
        context.fetchUserAddToCart();
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  const totalPrice = data.reduce(
    (prev, curr) => prev + curr.quantity * curr?.productId?.sellingPrice,
    0
  );

  const handlePayment = async () => {
    setShowModal(true); // Show payment modal when clicking "Proceed to Payment"
  };

  const handleSubmitPayment = async (e) => {
    e.preventDefault();

    // Hardcoded validation (you can add any validation you want here)
    if (
      !cardDetails.cardNumber ||
      !cardDetails.cardHolder ||
      !cardDetails.expiryDate ||
      !cardDetails.cvv
    ) {
      alert("Please fill in all the details.");
      return;
    }

    try {
      // Simulate order creation
      await fetch(SummaryApi.createOrder.url, {
        method: SummaryApi.createOrder.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products: data,
          totalQty,
          totalPrice,
        }),
      });

      // Redirect to the success page
      navigate("/success");
    } catch (err) {
      console.error("Payment failed", err);
    }
  };

  return (
    <div className="container mx-auto">
      {/* Cart Items Display */}
      <div className="flex flex-col lg:flex-row gap-10 lg:justify-around p-4">
        {/* Cart Product View */}
        <div className="w-full max-w-3xl">
          {loading
            ? loadingCart.map((_, index) => (
                <div
                  key={`AddToCartLoading-${index}`}
                  className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                />
              ))
            : data.map((product) => (
                <div
                  key={product?._id}
                  className="w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]"
                >
                  <div className="w-32 h-32 bg-slate-200">
                    <img
                      src={product?.productId?.productImage[0]}
                      className="w-full h-full object-scale-down mix-blend-multiply"
                      alt={product?.productId?.productName}
                    />
                  </div>
                  <div className="px-4 py-2 relative">
                    <div
                      className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer"
                      onClick={() => deleteCartProduct(product?._id)}
                    >
                      <MdDelete />
                    </div>

                    <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                      {product?.productId?.productName}
                    </h2>
                    <p className="capitalize text-slate-500">
                      {product?.productId.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-red-600 font-medium text-lg">
                        {displayINRCurrency(product?.productId?.sellingPrice)}
                      </p>
                      <p className="text-slate-600 font-semibold text-lg">
                        {displayINRCurrency(
                          product?.productId?.sellingPrice * product?.quantity
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <button
                        className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                        onClick={() =>
                          decreaseQty(product?._id, product?.quantity)
                        }
                      >
                        -
                      </button>
                      <span>{product?.quantity}</span>
                      <button
                        className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                        onClick={() =>
                          increaseQty(product?._id, product?.quantity)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Summary Section */}
        {data[0] && (
          <div className="mt-10 lg:mt-0 w-full max-w-md">
            {loading ? (
              <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
            ) : (
              <div className="h-36 bg-white">
                <h2 className="text-white font-normal text-xl bg-red-600 px-4 py-1">
                  Total Value
                </h2>
                <div className="flex items-center justify-between py-2 px-4 gap-2 font-medium text-lg text-slate-600">
                  <p>Quantity</p>
                  <p>{totalQty}</p>
                </div>

                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                  <p>Total Price</p>
                  <p>{displayINRCurrency(totalPrice)}</p>
                </div>

                <button
                  className="bg-blue-600 p-2 text-white font-normal text-xl w-full mt-2"
                  onClick={handlePayment}
                >
                  Proceed to Payment
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl animate-in fade-in duration-300">
            {/* Header */}
            <div className="relative border-b p-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  Secure Checkout
                </h2>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-full p-2 hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Security Badge */}
              <div className="mb-6 bg-blue-50 border border-blue-100 rounded-lg p-4">
                <p className="flex items-center gap-2 text-blue-700 text-sm">
                  <Lock className="h-4 w-4" />
                  Your payment is protected with enterprise-grade security
                </p>
              </div>

              <form onSubmit={handleSubmitPayment} className="space-y-6">
                {/* Card Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={cardDetails.cardNumber}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          cardNumber: e.target.value,
                        })
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="4242 4242 4242 4242"
                      maxLength="19"
                      required
                    />
                  </div>
                </div>

                {/* Cardholder Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={cardDetails.cardHolder}
                    onChange={(e) =>
                      setCardDetails({
                        ...cardDetails,
                        cardHolder: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Full name on card"
                    required
                  />
                </div>

                {/* Expiry and CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={cardDetails.expiryDate}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          expiryDate: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="MM/YY"
                      maxLength="5"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Security Code
                    </label>
                    <input
                      type="text"
                      value={cardDetails.cvv}
                      onChange={(e) =>
                        setCardDetails({ ...cardDetails, cvv: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="CVV"
                      maxLength="4"
                      required
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Pay {displayINRCurrency(totalPrice)}
                  </button>
                </div>
              </form>

              {/* Payment Methods */}
              <div className="flex items-center justify-center gap-2 mt-6">
                <CreditCard className="h-8 w-8 text-gray-400" />
                <p className="text-sm text-gray-500">
                  We accept all major credit cards
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
