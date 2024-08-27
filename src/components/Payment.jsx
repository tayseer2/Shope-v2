import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clear } from "../rtk/slices/cart-slice";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const [delivery] = useState(45);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalPrice = cart.reduce((acc, product) => {
    acc += product.price * product.quantity;
    return acc;
  }, 0);

  const showModel = () => {
    document.getElementById("my_modal_1").showModal();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(clear());
    showModel();
    navigate("/");
  };

  return (
    <div className="bg-base-200 border-b border-t border-gray-600 mt-20">
      <div className="font-[sans-serif] p-8">
        <div className="md:max-w-5xl max-w-xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 max-md:order-1">
              <h2 className="text-3xl font-extrabold text-white">
                Make a payment
              </h2>
              <p className="text-white text-sm mt-4">
                Complete your transaction swiftly and securely with our
                easy-to-use payment process.
              </p>

              <form
                className="mt-8 max-w-lg"
                method="post"
                action="/submit"
                onSubmit={handleSubmit}
              >
                <div className="grid gap-4">
                  <div>
                    <input
                      required
                      type="text"
                      placeholder="Cardholder's Name"
                      className="px-4 py-3.5 bg-gray-800 text-white w-full text-sm border rounded-md focus:border-red-500 focus:bg-transparent outline-none"
                    />
                  </div>

                  <div className="flex bg-gray-800 border rounded-md focus-within:border-red-500 focus-within:bg-transparent overflow-hidden">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 ml-3"
                      viewBox="0 0 32 20"
                    >
                      <circle cx="10" cy="10" r="10" fill="#f93232" />
                      <path
                        fill="#fed049"
                        d="M22 0c-2.246 0-4.312.75-5.98 2H16v.014c-.396.298-.76.634-1.107.986h2.214c.308.313.592.648.855 1H14.03a9.932 9.932 0 0 0-.667 1h5.264c.188.324.365.654.518 1h-6.291a9.833 9.833 0 0 0-.377 1h7.044c.104.326.186.661.258 1h-7.563c-.067.328-.123.66-.157 1h7.881c.039.328.06.661.06 1h-8c0 .339.027.67.06 1h7.882c-.038.339-.093.672-.162 1h-7.563c.069.341.158.673.261 1h7.044a9.833 9.833 0 0 1-.377 1H14.03c.266.352.553.687.862 1h2.215a10.05 10.05 0 0 1-1.107.986A9.937 9.937 0 0 0 22 20c5.523 0 10-4.478 10-10S27.523 0 22 0z"
                      />
                    </svg>
                    <input
                      maxLength={16}
                      required
                      type="text"
                      placeholder="Card Number"
                      className="px-4 py-3.5 text-white w-full text-sm outline-none bg-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                      maxLength={5}
                        required
                        type="text"
                        placeholder="EXP"
                        className="px-4 py-3.5 bg-gray-800 text-white w-full text-sm border rounded-md focus:border-red-500 focus:bg-transparent outline-none"
                      />
                    </div>
                    <div>
                      <input
                        maxLength={3}
                        required
                        type="text"
                        placeholder="CVV"
                        className="px-4 py-3.5 bg-gray-800 text-white w-full text-sm border rounded-md focus:border-red-500 focus:bg-transparent outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="my-10">
                  <button
                    type="submit"
                    className="px-10 rounded-full bg-white w-full p-3 font-bold text-red-500 hover:bg-red-500 hover:text-white transition-all duration-500"
                  >
                    Pay
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-gray-800 p-6 rounded-md">
              <h2 className="text-3xl font-extrabold text-white">
                ${(totalPrice + delivery).toFixed(2)}
              </h2>

              <ul className="text-white mt-8 space-y-4">
                <li className="flex flex-wrap gap-4 text-sm">
                  Sub Total
                  <span className="ml-auto font-bold">${totalPrice}</span>
                </li>
                <li className="flex flex-wrap gap-4 text-sm">
                  Delivery Charge{" "}
                  <span className="ml-auto font-bold">
                    ${delivery.toFixed(2)}
                  </span>
                </li>
                <li
                  className="flex flex-wrap
                         gap-4 text-sm font-bold border-t-2 pt-4"
                >
                  Total{" "}
                  <span className="ml-auto">
                    ${(totalPrice + delivery).toFixed(2)}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
