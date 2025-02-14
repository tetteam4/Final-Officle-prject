import { motion } from "framer-motion";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
const SocialShare = ({ show, url, title }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: show ? 1 : 0, y: show ? 0 : 20 }}
    className="fixed right-4 top-20 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg z-50"
  >
    <div className="flex gap-3">
      <a
        href={`https://twitter.com/share?url=${url}&text=${title}`}
        target="_blank"
      >
        <FaTwitter className="text-blue-400 text-xl" />
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?url=${url}&title=${title}`}
        target="_blank"
      >
        <FaLinkedin className="text-blue-600 text-xl" />
      </a>
      <a href={`https://www.facebook.com/sharer.php?u=${url}`} target="_blank">
        <FaFacebook className="text-blue-600 text-xl" />
      </a>
    </div>
  </motion.div>
);

export default SocialShare;
