"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementItem, decrementItem, removeItem } from "../store/cartSlice";
import { IoCloseCircleOutline } from "react-icons/io5";
const Cart = () => {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cart.items);
  console.log(carts);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  return (
    <>
      {carts?.length > 0 ? (
        <div className="bg-gray-100 min-h-screen block md:flex gap-8 justify-between p-6">
          {/* Left Section */}
          <div className="md:w-2/3 bg-white shadow-lg rounded-lg p-6">
            {carts?.map((item) => (
              <div key={item?.id} className="block md:flex items-center space-x-6 shadow-lg mb-2   h-[380px] md:h-[150px] ">
                {/* Product Image */}
                <img
                  src={item?.image}
                  alt=""
                  className="w-full h-[200px] md:w-[150px] md:h-[150px] object-cover rounded-lg border border-gray-300"
                />

                {/* Product Details */}
                <div className="flex w-full flex-col space-y-2 mt-4">
                  <div className="flex justify-between w-full ">
                    <div>
                      <h1 className="text-xl font-bold text-gray-800">
                        {item?.name || "Product Name"}
                      </h1>
                      <h2 className="text-lg text-gray-600 font-medium">
                        Price: $ {10 * item.quantity}{" "}
                      </h2>
                    </div>
                    <button
                      onClick={() => dispatch(removeItem(item?.id))}
                      className="  mr-8 md:mr-5 flex justify-center items-center"
                    >
                    <span className="text-3xl text-red-500"><IoCloseCircleOutline /></span>
                    </button>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => dispatch(decrementItem(item.id))}
                      className="w-10 h-10 bg-red-500 text-white flex items-center justify-center  rounded shadow-md hover:bg-red-600 transition-transform duration-200 hover:scale-110"
                    >
                      <span className="text-xl font-bold">−</span>
                    </button>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item?.quantity}
                    </h2>
                    <button
                      onClick={() => dispatch(incrementItem(item.id))}
                      className="w-10 h-10 bg-green-500 text-white flex items-center justify-center  rounded shadow-md hover:bg-green-600 transition-transform duration-200 hover:scale-110"
                    >
                      <span className="text-xl font-bold">+</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Section */}
          <div className="md:w-1/3 bg-white shadow-lg rounded-lg p-6 mt-5">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Cart Summary
            </h2>

            <div className="space-y-4">
              {carts?.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b border-gray-300 pb-2"
                >
                  {/* Item Name */}
                  <h3 className="text-lg font-medium text-gray-800">
                    {item.name}
                  </h3>

                  {/* Item Price */}
                  <p className="text-lg text-gray-600">
                    $ {10 * item.quantity}{" "}
                    {/* Adjust logic if price is dynamic */}
                  </p>
                </div>
              ))}
            </div>

            {/* Total Price */}
            <div className="border-t border-gray-300 pt-4 mt-4">
              <h3 className="text-xl font-semibold text-gray-800 flex justify-between">
                Total:
                <span className="text-green-500">$ {totalPrice}</span>
              </h3>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-700">
            No cart available
          </h1>
        </div>
      )}
    </>
  );
};

export default Cart;
