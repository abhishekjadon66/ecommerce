import React, { useState } from "react";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { BsBagCheck } from "react-icons/bs";
import Head from "next/head";
import Script from "next/script";
import Link from "next/link";
const checkout = ({ cart, subTotal, addToCart, removeFromCart }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [disabled, setDisabled] = useState(true);
  const handleChange = (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    } else if (e.target.name == "pincode") {
      setPincode(e.target.value);
    }
    if (name && email && phone && address && pincode) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const initiatePayment = async () => {
    let oid = Math.floor(Math.random() * Date.now());
    // Get a transaction token

    const data = {
      cart,
      subTotal,
      oid,
      email: email,
      name,
      address,
      pincode,
      phone,
    };

    let a = await fetch("http://localhost:3000/api/pretransaction", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let txnRes = await a.json();
    let txnToken = txnRes.txnToken;
    var config = {
      root: "",
      flow: "DEFAULT",
      data: {
        orderId: oid,
        token: txnToken,
        tokenType: "TXN_TOKEN",
        amount: subTotal,
      },
      handler: {
        notifyMerchant: function (eventName, data) {
          console.log("notifyMerchant handler function called");
          console.log("eventName => ", eventName);
          console.log("data => ", data);
        },
      },
    };

    window.Paytm.CheckoutJS.init(config)
      .then(function onSuccess() {
        // after successfully updating configuration, invoke JS Checkout
        window.Paytm.CheckoutJS.invoke();
      })
      .catch(function onError(error) {
        console.log("error => ", error);
      });
  };
  return (
    <div className="container px-2 sm:m-auto">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <Script
        type="application/javascript"
        src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}
        crossorigin="anonymous"
      />
      <h1 className="font-bold text-3xl my-8 text-center">Checkout</h1>
      <h2 className="font-bold text-xl">1. Deliver Details</h2>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <label htmlFor="name" className="leading-7 text-sm text-gray-600">
            Name
          </label>
          <input
            onChange={handleChange}
            value={name}
            placeholder="Enter your Name"
            type="text"
            id="name"
            name="name"
            className="w-full bg-white rounded border border-blue-500 focus:border-blue-500 focus:ring- focus:ring-blue-500 text-base outline-blue-500 text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="px-2 w-1/2">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">
            Email
          </label>
          <input
            onChange={handleChange}
            value={email}
            placeholder="Enter your Email"
            type="email"
            id="email"
            name="email"
            className="w-full bg-white rounded border border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div className="px-2 w-full">
        <label htmlFor="address" className="leading-7 text-sm text-gray-600">
          Address
        </label>
        <textarea
          onChange={handleChange}
          id="address"
          name="address"
          className="w-full bg-white rounded border border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          cols="30"
          rows="2"
        >
          {address}
        </textarea>
      </div>

      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <label
            htmlFor="phone no."
            className="leading-7 text-sm text-gray-600"
          >
            Phone
          </label>
          <input
            onChange={handleChange}
            value={phone}
            placeholder="Enter your Phone Number"
            type="phone"
            id="phone"
            name="phone"
            className="w-full bg-white rounded border border-blue-500 focus:border-blue-500 focus:ring- focus:ring-blue-500 text-base outline-blue-500 text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="px-2 w-1/2">
          <label htmlFor="city" className="leading-7 text-sm text-gray-600">
            City
          </label>
          <input
            value={city}
            readOnly={true}
            placeholder="Enter your City"
            type="city"
            id="city"
            name="city"
            className="w-full bg-white rounded border border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <label htmlFor="state" className="leading-7 text-sm text-gray-600">
            State
          </label>
          <input
            value={state}
            readOnly={true}
            placeholder="Enter your State"
            type="text"
            id="state"
            name="state"
            className="w-full bg-white rounded border border-blue-500 focus:border-blue-500 focus:ring- focus:ring-blue-500 text-base outline-blue-500 text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="px-2 w-1/2">
          <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">
            Pincode
          </label>
          <input
            onChange={handleChange}
            value={pincode}
            placeholder="Enter your Pincode"
            type="text"
            id="pincode"
            name="pincode"
            className="w-full bg-white rounded border border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>

      <h2 className="font-semibold text-xl">2. Review Cart Items & Payments</h2>

      <div className="sidebar  bg-blue-100 p-6 m-2">
        <ol className="list-decimal font-normal">
          {Object.keys(cart).length == 0 && (
            <div className="my-4 font-normal">Your cart is Empty</div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex my-5">
                  <div className="font-semibold ">
                    {cart[k].name}({cart[k].size}/{cart[k].variant})
                  </div>
                  <div className="w-1/3 flex font-normal items-center justify-center text-sm ">
                    <AiOutlineMinusCircle
                      onClick={() => {
                        removeFromCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].price,
                          cart[k].variant
                        );
                      }}
                      className="cursor-pointer text-blue-500"
                    />
                    <span className="mx-2 text-sm">{cart[k].qty}</span>{" "}
                    <AiOutlinePlusCircle
                      onClick={() => {
                        addToCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].price,
                          cart[k].variant
                        );
                      }}
                      className="cursor-pointer text-blue-500"
                    />
                  </div>
                </div>
              </li>
            );
          })}
          <span className="total">Subtotal: ₹{subTotal}</span>
        </ol>
      </div>
      <div className="mx-8">
        <Link href={"/checkout"}>
          <button
            disabled={disabled}
            onClick={initiatePayment}
            className="flex disabled:bg-blue-200 shadow-xl mr-2  text-white bg-blue-500 border-0 py-2 px-2 focus:outline-none hover:bg-blue-700 rounded text-sm"
          >
            <BsBagCheck className="m-1" />
            Pay ₹{subTotal}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default checkout;
