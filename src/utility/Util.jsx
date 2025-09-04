import BagImage1 from "/bagImage1.jpg";
import BagImage2 from "/bagImage2.jpg";
import BagImage3 from "/bagImage3.jpg";

const airportCordinates = (size) => {
  let airportName = new Map();

  airportName.set(3, [
    { x: 150, y: 80 },
    { x: 690, y: 80 },
    { x: 1190, y: 80 },
  ]);

  airportName.set(2, [
    { x: 150, y: 80 },
    { x: 1170, y: 80 },
  ]);
  return airportName.get(size);
};

const animationCordinates = (size) => {
  let airportName = new Map();
  airportName.set(3, { x: [120, 670, 1180], y: [40, 10, 40, 10, 40] });
  airportName.set(2, { x: [120, 1150], y: [40, 10, 40] });
  return airportName.get(size);
};

export default {
  airportCordinates,
  animationCordinates,
  BagImage1,
  BagImage2,
  BagImage3,
};
