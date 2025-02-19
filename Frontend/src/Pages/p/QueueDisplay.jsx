import React, { useState, useEffect } from "react";

const QueueDisplay = ({ orders }) => {
  const [currentOrder, setCurrentOrder] = useState(null);

  useEffect(() => {
    if (orders.length > 0) {
      const interval = setInterval(() => {
        setCurrentOrder(orders[0]); // نمایش اولین سفارش
        orders.shift(); // حذف سفارش از لیست
      }, 5000); // هر 5 ثانیه یک نوبت جدید

      return () => clearInterval(interval);
    }
  }, [orders]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-purple-900 mb-4">
          نمایش نوبت‌ها
        </h1>
        {currentOrder ? (
          <div className="space-y-4">
            <p className="text-2xl font-semibold text-gray-800">
              نوبت فعلی: {currentOrder.id}
            </p>
            <p className="text-xl text-gray-600">
              مشتری: {currentOrder.customerName}
            </p>
            <p className="text-lg text-gray-500">
              لطفاً به بخش تحویل مراجعه نمایید.
            </p>
          </div>
        ) : (
          <p className="text-xl text-gray-600">
            هیچ نوبتی در حال حاضر وجود ندارد.
          </p>
        )}
      </div>
    </div>
  );
};

export default QueueDisplay;
