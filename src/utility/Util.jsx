import BagImage1 from "/bagImage1.jpg";
import BagImage2 from "/bagImage2.jpg";
import BagImage3 from "/bagImage3.jpg";

const airportCordinates = (size) => {
  let airportName = new Map();

  airportName.set(3, [
    { x: 50, y: 80 },
    { x: 620, y: 80 },
    { x: 1150, y: 80 },
  ]);

  airportName.set(2, [
    { x: 50, y: 80 },
    { x: 1170, y: 80 },
  ]);
  return airportName.get(size);
};

const animationCordinates = (size) => {
  let airportName = new Map();
  airportName.set(3, { x: [30, 590, 1150], y: [50, 20, 50, 20, 50] });
  airportName.set(2, { x: [30, 1150], y: [50, 20, 30, 20, 50] });
  return airportName.get(size);
};

export default {
  airportCordinates,
  animationCordinates,
  BagImage1,
  BagImage2,
  BagImage3,
};
