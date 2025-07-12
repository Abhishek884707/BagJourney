import Util from "../utility/Util.jsx";
import airplane from "/airplane.svg";
import { motion } from "motion/react";

const Airplane = (props) => {
  let airports = [];
  const size = props.eventslist.size;

  let animationCordinates = {};
  if (size > 0) {
    let count = 0;
    if (size === 3) {
      const airportCordinates = Util.airportCordinates(size);
      animationCordinates = { ...Util.animationCordinates(size) };
      props.eventslist.forEach((airport, index) => {
        airports.push({
          name: index,
          x: airportCordinates[count].x,
          y: airportCordinates[count].y,
          isSelected: airport.isSelected,
        });
        count++;
      });
    }

    if (size === 2) {
      const airportCordinates = Util.airportCordinates(2);
      animationCordinates = { ...Util.animationCordinates(2) };
      props.eventslist.forEach((airport, index) => {
        airports.push({
          name: index,
          x: airportCordinates[count].x,
          y: airportCordinates[count].y,
          isSelected: airport.isSelected,
        });
        count++;
      });
    }
  }

  return (
    <section className="container airplaneAnimation">
      {airports.length > 0 && (
        <>
          <p className="instruction">
            📍 Click on an airport name to view the history of bag.
          </p>
          <svg width="100%" height="100px">
            {airports.map((a, idx) => (
              <text
                className={
                  a.isSelected ? "airportCodeHiglighted" : "airportCode"
                }
                key={idx}
                x={a.x}
                y={a.y}
                fontSize="16"
                fill="#000"
                textAnchor="middle"
                style={{ cursor: "pointer" }}
                onClick={() => props.handleShowHistory(a)}
              >
                {a.name}
              </text>
            ))}

            <motion.image
              href={airplane}
              width="50"
              height="50"
              x={0}
              y={-12}
              animate={animationCordinates}
              transition={{
                scale: 1.3,
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </svg>
        </>
      )}
    </section>
  );
};

export default Airplane;
