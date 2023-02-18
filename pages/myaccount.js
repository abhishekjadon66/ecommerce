import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
const myaccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [user, setUser] = useState({ valu: null });
  const [password, setPassword] = useState();
  const [cpassword, setCpassword] = useState();
  const router = useRouter();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("myuser"));

    if (!user) {
      router.push("/");
    }
    if (user && user.token) {
      setUser(user);
      setEmail(user.email);
    }
  }, [router.q]);

  const handleChange = async (e) => {
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
      if (e.target.value.length == 6) {
        let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
        let pinjson = await pins.json();
        if (Object.keys(pinjson).includes(e.target.value)) {
          setState(pinjson[e.target.value][1]);
          setCity(pinjson[e.target.value][0]);
        } else {
          setState("");
          setCity("");
        }
      } else {
        setState("");
        setCity("");
      }
    }
  };
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl text-center font-semibold">
        Update your Account
      </h1>

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
            Email (Cannot be updated)
          </label>

          {user && user.token ? (
            <input
              value={user.email}
              placeholder="Enter your Email"
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              readOnly
            />
          ) : (
            <input
              value={email}
              onChange={handleChange}
              placeholder="Enter your Email"
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              readOnly
            />
          )}
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
            placeholder="Enter your 10 Digit Phone Number"
            type="phone"
            id="phone"
            name="phone"
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

      <button className="flex m-2 shadow-xl mb-5  text-white bg-blue-500 border-0 py-2 px-2 focus:outline-none hover:bg-blue-700 rounded text-sm">
        Submit
      </button>

      <h2 className="font-bold text-xl">1. Change Password</h2>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <label htmlFor="password" className="leading-7 text-sm text-gray-600">
            Password
          </label>
          <input
            onChange={handleChange}
            value={password}
            placeholder="Enter your Name"
            type="text"
            id="password"
            name="password"
            className="w-full bg-white rounded border border-blue-500 focus:border-blue-500 focus:ring- focus:ring-blue-500 text-base outline-blue-500 text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="px-2 w-1/2">
          <label
            htmlFor="cpassword"
            className="leading-7 text-sm text-gray-600"
          >
            Confirm Password
          </label>
          <input
            onChange={handleChange}
            value={cpassword}
            placeholder="Enter your Name"
            type="text"
            id="cpassword"
            name="cpassword"
            className="w-full bg-white rounded border border-blue-500 focus:border-blue-500 focus:ring- focus:ring-blue-500 text-base outline-blue-500 text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <button className="flex m-2 shadow-xl text-white bg-blue-500 border-0 py-2 px-2 focus:outline-none hover:bg-blue-700 rounded text-sm">
        Submit
      </button>
    </div>
  );
};

export default myaccount;
