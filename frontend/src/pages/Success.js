import React from "react";
import SUCCESSIMAGE from "./../assest/success.gif";
import { Link } from "react-router-dom";
const Success = () => {
  return (
    <div className=" w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2 rounded">
      <img src={SUCCESSIMAGE} alt="success" width={1000} height={400} />
      <p className="text-green-600 font-bold text-xl">Payment Successfull</p>
      <Link to={"/order"} className="p-2 px-3 mt-5 border-2 border-green-600 rounded font-semibold text-gray-600 hover:bg-green-700 hover:text-white">
        View Orders
      </Link>
    </div>
  );
};

export default Success;
