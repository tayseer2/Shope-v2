import { useDispatch, useSelector } from "react-redux";
import {
  clear,
  decreaseQuantity,
  deleteFromCart,
  increaseQuantity,
} from "../rtk/slices/cart-slice";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Cart() {
  const [delivery] = useState(45);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const totalPrice = cart.reduce((acc, product) => {
    acc += product.price * product.quantity;
    return acc;
  }, 0);

  return (
    <section className="py-24 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
        <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-white">
          Shopping Cart
        </h2>
        <div className="flex justify-center items-center">
          <button
            className="bg-white text-red-500 p-3 rounded-lg mb-5 font-bold hover:bg-red-500 hover:text-white transition-all duration-500"
            onClick={() => dispatch(clear())}
          >
            Clear Cart
          </button>
        </div>

        {cart.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4"
          >
            <div className="col-span-12 lg:col-span-2 img box">
              <img
                src={item.image}
                alt={item.title}
                className="max-lg:w-full lg:w-[180px] rounded-lg"
              />
            </div>
            <div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
              <div className="flex items-center justify-between w-full mb-4">
                <h5 className="font-manrope font-bold text-2xl leading-9 text-white">
                  {item.title.split(" ").slice(0, 3).join(" ")}
                </h5>
                <button
                  className="rounded-full group flex items-center justify-center focus-within:outline-red-500"
                  onClick={() => dispatch(deleteFromCart(item))}
                >
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 34 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="fill-red-50 transition-all duration-500 group-hover:fill-red-400"
                      cx="17"
                      cy="17"
                      r="17"
                    />
                    <path
                      className="stroke-red-500 transition-all duration-500 group-hover:stroke-white"
                      d="M14.1673 13.5997V12.5923C14.1673 11.8968 14.7311 11.333 15.4266 11.333H18.5747C19.2702 11.333 19.834 11.8968 19.834 12.5923V13.5997M19.834 13.5997C19.834 13.5997 14.6534 13.5997 11.334 13.5997C6.90804 13.5998 27.0933 13.5998 22.6673 13.5997C21.5608 13.5997 19.834 13.5997 19.834 13.5997ZM12.4673 13.5997H21.534V18.8886C21.534 20.6695 21.534 21.5599 20.9807 22.1131C20.4275 22.6664 19.5371 22.6664 17.7562 22.6664H16.2451C14.4642 22.6664 13.5738 22.6664 13.0206 22.1131C12.4673 21.5599 12.4673 20.6695 12.4673 18.8886V13.5997Z"
                      stroke="#EF4444"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
              <p className="font-normal text-base leading-7 text-gray-500 mb-6">
                {item.description}{" "}
                <a href="#" className="text-red-500">
                  More....
                </a>
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      dispatch(decreaseQuantity(item));
                    }}
                    className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300"
                  >
                    <svg
                      className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.5 9.5H13.5"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <input
                    type="text"
                    id="number"
                    value={item.quantity}
                    className="border border-gray-200 rounded-full w-10 aspect-square outline-none text-gray-900 font-semibold text-sm py-1.5 px-3 bg-gray-100 text-center"
                    placeholder={item.quantity}
                  />
                  <button
                    onClick={() => {
                      dispatch(increaseQuantity(item));
                    }}
                    className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300"
                  >
                    <svg
                      className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.75 9.5H14.25M9 14.75V4.25"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <h6 className="text-red-500 font-manrope font-bold text-2xl leading-9 text-right">
                  ${item.price * item.quantity}
                </h6>
              </div>
            </div>
          </div>
        ))}

        <div className="border-2 border-gray-200 rounded-3xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto">
          <div className="flex items-center justify-between w-full mb-6">
            <p className="font-normal text-xl leading-8 text-white">
              Sub Total
            </p>
            <h6 className="font-semibold text-xl leading-8 text-white">
              ${totalPrice.toFixed(2)}
            </h6>
          </div>
          <div className="flex items-center justify-between w-full pb-6 border-b border-gray-200">
            <p className="font-normal text-xl leading-8 text-white">
              Delivery Charge
            </p>
            <h6 className="font-semibold text-xl leading-8 text-white">
              $45.00
            </h6>
          </div>
          <div className="flex items-center justify-between w-full py-6">
            <p className="font-manrope font-medium text-2xl leading-9 text-white">
              Total
            </p>
            <h6 className="font-manrope font-medium text-2xl leading-9 text-red-500">
              ${(totalPrice + delivery).toFixed(2)}
            </h6>
          </div>
        </div>
        <div className="flex justify-center items-center text-center">
          <Link
            to={"/Payment"}
            className="rounded-full bg-white w-full  p-3 font-bold text-red-500 hover:bg-red-500 hover:text-white transition-all duration-500"
          >
            Order Now
          </Link>
        </div>
      </div>
    </section>
  );
}
