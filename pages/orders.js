import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
const Orders = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorder`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: JSON.parse(localStorage.getItem("myuser")).token }),
      });
      let res = await a.json();
      setOrders(res.orders);
    };

    if (!localStorage.getItem("myuser")) {
      router.push("/");
    } else {
      fetchOrders();
    }
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto text-center">
        <h1 className="font-semibold text-2xl text-center py-4">My Orders</h1>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        #Order Id
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((item) => {
                      return (
                        <tr key={item._id} className="border-b">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.orderId}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {item.Email}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {item.amount}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <Link href={"/order?id=" + item._id}>
                              <a>Details</a>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
