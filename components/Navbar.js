import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  AiOutlineShoppingCart,
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
} from "react-icons/ai";

import { IoCloseCircleOutline } from "react-icons/io5";
import { BsBagCheck } from "react-icons/bs";
import { RiAccountCircleLine } from "react-icons/ri";
import Image from "next/image";
import { useRouter } from "next/router";
const Navbar = ({
  Logout,
  user,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
}) => {
  const [dropdown, setDropdown] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  const router = useRouter();

  useEffect(() => {
    Object.keys(cart).length !== 0 && setSidebar(true);
    let exempted = ["/checkout", "/order", "/orders", "/myaccount"];

    if (exempted.includes(router.pathname)) {
      setSidebar(false);
    }
  }, []);

  const toggleCart = () => {
    setSidebar(!sidebar);
    // if (ref.current.classList.contains("translate-x-full")) {
    //   ref.current.classList.remove("translate-x-full");
    //   ref.current.classList.add("translate-x-0");
    // } else if (!ref.current.classList.contains("translate-x-full")) {
    //   ref.current.classList.remove("translate-x-0");
    //   ref.current.classList.add("translate-x-full");
    // }
  };
  const ref = useRef();

  // const toggleDropdown = () => {
  //   setDropdown(!dropdown);
  // };
  return (
    <>
      {!sidebar && 
        <span
          onMouseOver={() => {
            setDropdown(true);
          }}
          onMouseLeave={() => {
            setDropdown(false);
          }} className='fixed right-10 top-5 z-30 cursor-pointer'
        >
        
      
          {dropdown && (
            <div className="absolute right-5 top-5 py-3 rounded-md px-5 w-32 bg-blue-100 text-sm z-30"
            >
              <ul>
                <Link href={"/myaccount"}>
                  <li className="py-1 hover:text-blue-500">MY Account</li>
                </Link>
                <Link href={"/orders"}>
                  <li className="py-1 hover:text-blue-500">My Orders</li>
                </Link>

                <li onClick={Logout} className="py-1 hover:text-blue-500">
                  Logout
                </li>
              </ul>
            </div>
          )}
          {user.value &&  <RiAccountCircleLine className="text-xl md:text-2xl mx-2" />
          }
        </span>
      }
      <div
        className={`flex flex-col md:flex-row md:justify-start justify-center items-center my-2 py-2 shadow-md sticky top-0 bg-white z-10 ${
          !sidebar && "overflow-hidden"
        }`}
      >
        <div className="logo mr-auto md:mx-5 cursor-pointer">
          <Link href={"/"}>
            <Image
              src="/logo.png"
              alt="Picture of the author"
              width={100}
              height={0}
            />
          </Link>
        </div>
        <div className="nav">
          <ul className="flex items-center space-x-6 font-semibold md:text-md">
            <Link href={"/tshirts"}>
              <li>Tshirts</li>
            </Link>
            <Link href={"/hoodies"}>
              <li>Hoodies</li>
            </Link>
            <Link href={"/stickers"}>
              <li>Stickers</li>
            </Link>
            <Link href={"/mugs"}>
              <li>Mugs</li>
            </Link>
          </ul>
        </div>
        <div className="cart items-center absolute right-0 top-3 mx-5 cursor-pointer flex">
          {!user.value && (
            <Link href={"/login"}>
              <button className="bg-blue-600 px-2 py-1 rounded-md text-sm text-white mx-2">
                Login
              </button>
            </Link>
          )}
          <AiOutlineShoppingCart
            onClick={toggleCart}
            className="text-xl md:text-2xl"
          />
        </div>

        <div
          ref={ref}
          className={`w-72 h-[100vh] sidecart absolute  top-0 bg-blue-100 px-8 py-10  transition-all overflow-y-scroll  ${
            sidebar ? "right-0" : "-right-96"
          }`}
        >
          <h2 className="font-normal text-xl text-center">Shopping Cart</h2>
          <span
            onClick={toggleCart}
            className="absolute top-4 right-3 cursor-pointer text-xl text-blue-500"
          >
            <IoCloseCircleOutline />
          </span>
          <ol className="list-decimal font-normal">
            {Object.keys(cart).length == 0 && (
              <div className="my-4 font-normal">Your cart is Empty</div>
            )}
            {Object.keys(cart).map((k) => {
              return (
                <li key={k}>
                  <div className="item flex my-5">
                    <div className="w-2/3 ">
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
          </ol>
          <div className="font-bold my-2">Subtotal: ₹{subTotal}</div>
          <div className="flex">
            <Link href={"/checkout"}>
              <button
                disabled={Object.keys(cart).length == 0}
                className="disabled:bg-blue-300  flex mt-10 mr-2  text-white bg-blue-500 border-0 py-2 px-2 focus:outline-none hover:bg-blue-700 rounded text-sm"
              >
                <BsBagCheck className="m-1" />
                Checkout
              </button>
            </Link>
            <button
              disabled={Object.keys(cart).length == 0}
              onClick={clearCart}
              className="disabled:bg-blue-300 flex mt-10 mr-2 text-white bg-blue-500 border-0 py-2 px-2 focus:outline-none hover:bg-blue-700 rounded text-sm"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
