import "./App.css";
import Search from "./components/Search";
import Header from "./components/Header";
import History from "./components/History";
import Airplane from "./components/Airplane";
import PaxDetails from "./components/PaxDetails";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import { motion } from "motion/react";
import NotFound from "./components/NotFound";

function App() {
  const [bagHistory, setBagHistory] = useState({
    success: false,
  });

  const [paxDetails, setPaxDetails] = useState({
    animateToggle: false,
  });

  const [events, setEvents] = useState([]);

  const [selected, setSelected] = useState("");

  const [animate, setAnimate] = useState({
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: "easeOut",
    },
  });

  const [flags, setFlags] = useState({
    searchFound: false,
    networkError: false,
  });

  useEffect(() => {
    const notFound = document.getElementsByClassName("notFound");
    notFound[0].style.display = "none";
  }, []);

  function handleShowSelectedHistory(value) {
    const selecedValue = value.name;
    let newMapValues = new Map();
    events.forEach((air, index) => {
      if (index.toLowerCase() == selecedValue.toLowerCase()) {
        newMapValues.set(index, { ...air, isSelected: true });
      } else {
        newMapValues.set(index, { ...air, isSelected: false });
      }
    });
    setEvents(newMapValues);
    setSelected(selecedValue);
  }
  return (
    <>
      {!bagHistory.success && (
        <NotFound key={flags.searchFound} animate={animate} flags={flags} />
      )}
      <Header />
      <Search
        key="search"
        setBagHistory={setBagHistory}
        setEvents={setEvents}
        setSelected={setSelected}
        setAnimate={setAnimate}
        setPaxDetails={setPaxDetails}
        setFlags={setFlags}
      />
      {bagHistory.success && (
        <PaxDetails key="pax" paxDetails={paxDetails} animate={animate} />
      )}
      {bagHistory.success && (
        <Airplane
          key="animate"
          eventslist={events}
          handleShowHistory={handleShowSelectedHistory}
        />
      )}
      {bagHistory.success && (
        <History key="history" selected={selected} events={events} />
      )}
      <Footer />
    </>
  );
}

export default App;
