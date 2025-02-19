import React, { useState } from "react";

const OrderQueueSystem = () => {
  const [orders, setOrders] = useState([]); // لیست سفارشات
  const [newOrder, setNewOrder] = useState(""); // سفارش جدید

  const addOrder = () => {
    if (newOrder.trim()) {
      const order = {
        id: orders.length + 1, // شماره نوبت
        customerName: newOrder,
        status: "در انتظار", // وضعیت سفارش
      };
      setOrders([...orders, order]);
      setNewOrder(""); // پاک کردن فیلد ورودی
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-purple-900 mb-8">
          سیستم نوبت‌دهی چای‌خانه
        </h1>

        {/* فرم دریافت سفارش */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            دریافت سفارش جدید
          </h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={newOrder}
              onChange={(e) => setNewOrder(e.target.value)}
              placeholder="نام مشتری"
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button
              onClick={addOrder}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              افزودن سفارش
            </button>
          </div>
        </div>

        {/* لیست سفارشات */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            لیست سفارشات
          </h2>
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex justify-between items-center p-4 border border-gray-200 rounded-lg"
              >
                <div>
                  <p className="text-lg font-semibold text-purple-900">
                    نوبت {order.id}
                  </p>
                  <p className="text-gray-600">{order.customerName}</p>
                </div>
                <span
                  className={`px-4 py-1 rounded-full text-sm font-medium ${
                    order.status === "در انتظار"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderQueueSystem;
