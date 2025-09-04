import { motion } from "motion/react";
import Util from "../utility/Util";

const PaxDetails = ({ paxDetails, animate }) => {
  const {
    firstName,
    lastName,
    frequentFlyerId,
    weightDetails,
  } = paxDetails;

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
          <div className="paxDetailsCard">
            <h2>Passenger Information</h2>
            <div className="paxDetails">
              <div>
                <p>FirstName:</p>
                <p>LastName:</p>
                <p>Frequent Flyer Id:</p>
                <p>Total No. Bags:</p>
                <p>Weight:</p>
              </div>
              <div className="paxValues">
                <p className="value">{firstName}</p>
                <p className="value">{lastName}</p>
                <p className="value">{frequentFlyerId}</p>
                <p className="value">{weightDetails.numberOfCheckedBag}</p>
                <p className="value">{`${weightDetails.checkedWeight} ${weightDetails.indicator}`}</p>
              </div>
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
