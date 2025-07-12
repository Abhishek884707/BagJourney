import { motion } from "motion/react";
import Util from "../utility/Util";

const PaxDetails = ({ paxDetails, animate }) => {
  const { firstName, lastName, weightDetails, reconciliation } = paxDetails;

  const randomImage = "/bagImage" + (Math.floor(Math.random() * 3) + 1);
  return (
    <motion.section
      initial={{
        y: -200,
        opacity: 0,
      }}
      key={paxDetails.animateToggle}
      animate={animate}
      className="container paxContainer"
    >
      {
        <>
          <div className="paxDetails">
            <div>
              <p>FirstName:</p>
              <p>LastName:</p>
              <p>Pax Status:</p>
              <p>Total No. Bags:</p>
              <p>Weight:</p>
            </div>
            <div className="paxValues">
              <p className="value">{firstName}</p>
              <p className="value">{lastName}</p>
              <p className="value">
                {reconciliation.passengerStatus == "A" ? "Active" : "Inactive"}
              </p>
              <p className="value">{weightDetails.numberOfCheckedBag}</p>
              <p className="value">{`${weightDetails.checkedWeight} ${weightDetails.indicator}`}</p>
            </div>
          </div>
          <div className="bagImage">
            <img src={`${randomImage}.jpg`} alt="Bag Image" />
          </div>
        </>
      }
    </motion.section>
  );
};

export default PaxDetails;
