// components/ServiceList.js
import { motion } from "framer-motion";

const ServiceList = ({ services }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {services.map((service) => (
        <motion.div
          key={service.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ServiceList;
