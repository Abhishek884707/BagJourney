import { motion } from "motion/react";

const NotFound = ({ animate }) => {
  function handleClick() {
    const notFound = document.getElementsByClassName("notFound");
    notFound[0].style.display = "none";
  }
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -200,
      }}
      animate={animate}
      className="notFound"
    >
      <button className="cancelButton" onClick={handleClick}>
        x
      </button>
      <h1 className="notFoundText">No data found!</h1>
    </motion.div>
  );
};

export default NotFound;
