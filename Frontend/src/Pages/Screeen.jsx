

// import React, { useState } from "react";
// import OrderQueueSystem from "./p/OrderQueueSystem";
// import QueueDisplay from "./p/QueueDisplay";

// const Quer = () => {
//   const [orders, setOrders] = useState([]);

//   return (
//     <div>
//       <OrderQueueSystem orders={orders} setOrders={setOrders} />
//       <QueueDisplay orders={orders} />
//     </div>
//   );
// };

// export default Quer;







// import React, { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { FiUser, FiPlus, FiX, FiUsers, FiStar } from "react-icons/fi";

// // استایل‌های مشترک
// const cardStyle =
//   "bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow";
// const buttonStyle =
//   "flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:scale-105";

// function QueueSystem() {
//   const [queue, setQueue] = useState([
//     { id: 1, name: "فرید", assignedDesigner: null, status: "waiting" },
//     { id: 2, name: "نادیا", assignedDesigner: null, status: "waiting" },
//     { id: 3, name: "علی", assignedDesigner: null, status: "waiting" },
//   ]);

//   const [designers, setDesigners] = useState([
//     {
//       id: 1,
//       name: "آلیا",
//       expertise: "طراحی مدرن",
//       status: "available",
//       icon: <FiStar className="text-yellow-500" />,
//     },
//     {
//       id: 2,
//       name: "رضا",
//       expertise: "طراحی کلاسیک",
//       status: "busy",
//       icon: <FiUser className="text-blue-500" />,
//     },
//     {
//       id: 3,
//       name: "مریم",
//       expertise: "طراحی مینیمال",
//       status: "available",
//       icon: <FiUsers className="text-green-500" />,
//     },
//   ]);

//   const [newCustomer, setNewCustomer] = useState("");
//   const [showDesignerPanel, setShowDesignerPanel] = useState(false);

//   // منطق درگ اند دراپ
//   const onDragEnd = (result) => {
//     if (!result.destination) return;

//     const items = Array.from(queue);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);

//     setQueue(items);
//   };

//   // افزودن مشتری جدید
//   const addCustomer = () => {
//     if (newCustomer.trim()) {
//       setQueue([
//         ...queue,
//         {
//           id: Date.now(),
//           name: newCustomer,
//           assignedDesigner: null,
//           status: "waiting",
//         },
//       ]);
//       setNewCustomer("");
//     }
//   };

//   // اختصاص طراح
//   const assignDesigner = (customerId, designerId) => {
//     setQueue(
//       queue.map((customer) =>
//         customer.id === customerId
//           ? { ...customer, assignedDesigner: designerId, status: "in-progress" }
//           : customer
//       )
//     );
//   };

//   // تکمیل جلسه
//   const completeSession = (customerId) => {
//     setQueue(
//       queue.map((customer) =>
//         customer.id === customerId
//           ? { ...customer, status: "completed" }
//           : customer
//       )
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8 flex gap-8">
//       {/* پنل اصلی نوبت‌ها */}
//       <div className="flex-1">
//         <div className="mb-8 flex gap-4 items-center">
//           <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
//             <FiUser className="text-blue-600" /> سیستم مدیریت نوبت
//           </h1>
//           <div className="flex gap-2 ml-auto">
//             <button
//               onClick={() => setShowDesignerPanel(!showDesignerPanel)}
//               className={`${buttonStyle} bg-purple-500 text-white`}
//             >
//               <FiPlus /> مدیریت طراحان
//             </button>
//           </div>
//         </div>

//         {/* افزودن مشتری جدید */}
//         <div className="mb-8 flex gap-4">
//           <input
//             type="text"
//             value={newCustomer}
//             onChange={(e) => setNewCustomer(e.target.value)}
//             placeholder="نام مشتری جدید..."
//             className="flex-1 p-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-blue-500"
//           />
//           <button
//             onClick={addCustomer}
//             className={`${buttonStyle} bg-blue-500 text-white`}
//           >
//             <FiPlus /> افزودن مشتری
//           </button>
//         </div>

//         {/* لیست نوبت‌ها */}
//         <DragDropContext onDragEnd={onDragEnd}>
//           <Droppable droppableId="customers">
//             {(provided) => (
//               <div
//                 {...provided.droppableProps}
//                 ref={provided.innerRef}
//                 className="space-y-4"
//               >
//                 {queue.map((customer, index) => (
//                   <Draggable
//                     key={customer.id}
//                     draggableId={customer.id.toString()}
//                     index={index}
//                   >
//                     {(provided) => (
//                       <div
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                         className={`${cardStyle} relative group ${
//                           customer.status === "completed" ? "opacity-50" : ""
//                         }`}
//                       >
//                         <div className="flex items-center gap-4">
//                           <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                             <span className="text-blue-600">#{index + 1}</span>
//                           </div>

//                           <div className="flex-1">
//                             <h3 className="text-lg font-semibold">
//                               {customer.name}
//                             </h3>
//                             <div className="flex items-center gap-2 mt-2">
//                               {customer.assignedDesigner ? (
//                                 <>
//                                   {
//                                     designers.find(
//                                       (d) => d.id === customer.assignedDesigner
//                                     )?.icon
//                                   }
//                                   <span className="text-sm text-gray-600">
//                                     {
//                                       designers.find(
//                                         (d) =>
//                                           d.id === customer.assignedDesigner
//                                       )?.name
//                                     }
//                                   </span>
//                                 </>
//                               ) : (
//                                 <span className="text-sm text-gray-400">
//                                   طراح اختصاص داده نشده
//                                 </span>
//                               )}
//                             </div>
//                           </div>

//                           <div className="flex gap-2">
//                             {customer.status !== "completed" && (
//                               <button
//                                 onClick={() => completeSession(customer.id)}
//                                 className="p-2 hover:bg-red-50 rounded-full text-red-500"
//                               >
//                                 <FiX />
//                               </button>
//                             )}
//                           </div>
//                         </div>

//                         {/* وضعیت */}
//                         <div
//                           className={`absolute top-0 right-0 w-2 h-full rounded-r-lg ${
//                             customer.status === "completed"
//                               ? "bg-green-500"
//                               : customer.status === "in-progress"
//                               ? "bg-yellow-500"
//                               : "bg-gray-300"
//                           }`}
//                         />
//                       </div>
//                     )}
//                   </Draggable>
//                 ))}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//         </DragDropContext>
//       </div>

//       {/* پنل جانبی طراحان */}
//       {showDesignerPanel && (
//         <div className="w-80 bg-white p-6 rounded-xl shadow-xl">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-bold flex items-center gap-2">
//               <FiUsers className="text-purple-500" /> مدیریت طراحان
//             </h2>
//             <button
//               onClick={() => setShowDesignerPanel(false)}
//               className="p-2 hover:bg-gray-100 rounded-full"
//             >
//               <FiX />
//             </button>
//           </div>

//           <div className="space-y-4">
//             {designers.map((designer) => (
//               <div key={designer.id} className={`${cardStyle} relative`}>
//                 <div className="flex items-center gap-4">
//                   <div className="text-2xl">{designer.icon}</div>
//                   <div>
//                     <h3 className="font-semibold">{designer.name}</h3>
//                     <p className="text-sm text-gray-500">
//                       {designer.expertise}
//                     </p>
//                   </div>
//                   <span
//                     className={`ml-auto px-2 py-1 rounded-full text-sm ${
//                       designer.status === "available"
//                         ? "bg-green-100 text-green-600"
//                         : "bg-red-100 text-red-600"
//                     }`}
//                   >
//                     {designer.status === "available" ? "آماده" : "مشغول"}
//                   </span>
//                 </div>
//               </div>
//             ))}

//             <button className={`${buttonStyle} bg-green-500 text-white w-full`}>
//               <FiPlus /> افزودن طراح جدید
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default QueueSystem;


import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  FiUser,
  FiPlus,
  FiX,
  FiUsers,
  FiStar,
  FiEdit,
  FiCheck,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const cardStyle =
  "bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all";
const buttonStyle =
  "flex items-center gap-2 px-4 py-2 rounded-xl transition-transform hover:scale-[1.02]";

function QueueSystem() {
  const [queue, setQueue] = useState([
    { id: 1, name: "فرید", assignedDesigner: null, status: "waiting" },
    { id: 2, name: "نادیا", assignedDesigner: null, status: "waiting" },
    { id: 3, name: "علی", assignedDesigner: null, status: "waiting" },
  ]);

  const [designers, setDesigners] = useState([
    {
      id: 1,
      name: "آلیا",
      expertise: "طراحی مدرن",
      status: "available",
      icon: <FiStar className="text-yellow-500" />,
    },
    {
      id: 2,
      name: "رضا",
      expertise: "طراحی کلاسیک",
      status: "busy",
      icon: <FiUser className="text-blue-500" />,
    },
    {
      id: 3,
      name: "مریم",
      expertise: "طراحی مینیمال",
      status: "available",
      icon: <FiUsers className="text-green-500" />,
    },
  ]);

  const [newCustomer, setNewCustomer] = useState("");
  const [newDesigner, setNewDesigner] = useState({ name: "", expertise: "" });
  const [showDesignerPanel, setShowDesignerPanel] = useState(false);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(queue);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setQueue(items);
  };

  const addCustomer = () => {
    if (newCustomer.trim()) {
      setQueue([
        ...queue,
        {
          id: Date.now(),
          name: newCustomer,
          assignedDesigner: null,
          status: "waiting",
        },
      ]);
      setNewCustomer("");
    }
  };

  const addDesigner = () => {
    if (newDesigner.name.trim() && newDesigner.expertise.trim()) {
      setDesigners([
        ...designers,
        {
          id: Date.now(),
          ...newDesigner,
          status: "available",
          icon: <FiUser className="text-purple-500" />,
        },
      ]);
      setNewDesigner({ name: "", expertise: "" });
    }
  };

  const assignDesigner = (customerId, designerId) => {
    setQueue(
      queue.map((customer) =>
        customer.id === customerId
          ? { ...customer, assignedDesigner: designerId, status: "in-progress" }
          : customer
      )
    );
  };

  const completeSession = (customerId) => {
    setQueue(
      queue.map((customer) =>
        customer.id === customerId
          ? { ...customer, status: "completed" }
          : customer
      )
    );
  };

  const toggleDesignerStatus = (designerId) => {
    setDesigners(
      designers.map((designer) =>
        designer.id === designerId
          ? {
              ...designer,
              status: designer.status === "available" ? "busy" : "available",
            }
          : designer
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8 flex gap-8">
        {/* Main Content */}
        <div className="flex-1 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-gray-800 flex items-center gap-2"
            >
              <FiUser className="text-blue-600" /> سیستم مدیریت نوبت
            </motion.h1>

            <button
              onClick={() => setShowDesignerPanel(!showDesignerPanel)}
              className={`${buttonStyle} bg-purple-500 text-white`}
            >
              <FiPlus /> {showDesignerPanel ? "بستن پنل" : "مدیریت طراحان"}
            </button>
          </div>

          {/* Add Customer Form */}
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <input
              type="text"
              value={newCustomer}
              onChange={(e) => setNewCustomer(e.target.value)}
              placeholder="نام مشتری جدید..."
              className="flex-1 p-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-blue-500"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addCustomer}
              className={`${buttonStyle} bg-blue-500 text-white`}
            >
              <FiPlus /> افزودن مشتری
            </motion.button>
          </motion.div>

          {/* Queue List */}
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="customers">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4"
                >
                  <AnimatePresence>
                    {queue.map((customer, index) => (
                      <Draggable
                        key={customer.id}
                        draggableId={customer.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <motion.div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            className={`${cardStyle} relative group ${
                              customer.status === "completed"
                                ? "opacity-50"
                                : ""
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600">
                                  #{index + 1}
                                </span>
                              </div>

                              <div className="flex-1">
                                <h3 className="text-lg font-semibold">
                                  {customer.name}
                                </h3>
                                <div className="flex items-center gap-2 mt-2">
                                  {customer.assignedDesigner ? (
                                    <>
                                      {
                                        designers.find(
                                          (d) =>
                                            d.id === customer.assignedDesigner
                                        )?.icon
                                      }
                                      <span className="text-sm text-gray-600">
                                        {
                                          designers.find(
                                            (d) =>
                                              d.id === customer.assignedDesigner
                                          )?.name
                                        }
                                      </span>
                                    </>
                                  ) : (
                                    <div className="flex gap-2">
                                      {designers
                                        .filter((d) => d.status === "available")
                                        .map((designer) => (
                                          <motion.button
                                            key={designer.id}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() =>
                                              assignDesigner(
                                                customer.id,
                                                designer.id
                                              )
                                            }
                                            className="p-1 hover:bg-gray-100 rounded-full"
                                          >
                                            {designer.icon}
                                          </motion.button>
                                        ))}
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="flex gap-2">
                                {customer.status !== "completed" && (
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => completeSession(customer.id)}
                                    className="p-2 hover:bg-red-50 rounded-full text-red-500"
                                  >
                                    <FiX />
                                  </motion.button>
                                )}
                              </div>
                            </div>

                            {/* Status Indicator */}
                            <div
                              className={`absolute top-0 right-0 w-2 h-full rounded-r-xl ${
                                customer.status === "completed"
                                  ? "bg-green-500"
                                  : customer.status === "in-progress"
                                  ? "bg-yellow-500"
                                  : "bg-gray-300"
                              }`}
                            />
                          </motion.div>
                        )}
                      </Draggable>
                    ))}
                  </AnimatePresence>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        {/* Designer Panel */}
        {showDesignerPanel && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="w-96 bg-white p-6 rounded-xl shadow-xl h-[calc(100vh-4rem)] sticky top-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FiUsers className="text-purple-500" /> مدیریت طراحان
              </h2>
              <button
                onClick={() => setShowDesignerPanel(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <FiX />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <input
                  type="text"
                  value={newDesigner.name}
                  onChange={(e) =>
                    setNewDesigner({ ...newDesigner, name: e.target.value })
                  }
                  placeholder="نام طراح"
                  className="w-full p-2 mb-2 rounded-lg border"
                />
                <input
                  type="text"
                  value={newDesigner.expertise}
                  onChange={(e) =>
                    setNewDesigner({
                      ...newDesigner,
                      expertise: e.target.value,
                    })
                  }
                  placeholder="تخصص"
                  className="w-full p-2 mb-2 rounded-lg border"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addDesigner}
                  className={`${buttonStyle} bg-green-500 text-white w-full`}
                >
                  <FiPlus /> افزودن طراح جدید
                </motion.button>
              </div>

              {designers.map((designer) => (
                <motion.div
                  key={designer.id}
                  className={`${cardStyle} relative`}
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{designer.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{designer.name}</h3>
                      <p className="text-sm text-gray-500">
                        {designer.expertise}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleDesignerStatus(designer.id)}
                        className={`p-2 rounded-full ${
                          designer.status === "available"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {designer.status === "available" ? (
                          <FiCheck />
                        ) : (
                          <FiX />
                        )}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <FiEdit />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </DndProvider>
  );
}

export default QueueSystem;