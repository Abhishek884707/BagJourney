import { useState } from "react";
import ApiClient from "../ApiClient.jsx";
import { motion } from "motion/react";
import NotFound from "./NotFound.jsx";

export default function Search(props) {
  const [search, setSearch] = useState({
    bagTagNumber: "",
    date: "",
    pnr: "",
    surName: "",
    advanceSearch: false,
  });

  const handleSubmit = async () => {
    ApiClient.getBagHistory(
      search.bagTagNumber,
      search.date,
      search.surName,
      search.pnr
    )
      .then((response) => {
        let res = response.data;
        if (res.success) {
          props.setAnimate({
            y: 0,
            opacity: [0, 0.5, 1],
            transition: {
              duration: 1.5,
            },
          });
          props.setPaxDetails((prev) => {
            return {
              firstName: res.firstName,
              lastName: res.lastName,
              weightDetails: res.weightDetails,
              frequentFlyerId: res.frequentFlyerId,
              reconciliation: res.reconciliation,
              animateToggle: !prev.animateToggle,
            };
          });
          const mapOfEvents = ApiClient.matchData(response.data);
          props.setEvents(mapOfEvents);
          mapOfEvents.forEach((airport, index) => {
            if (airport.isSelected) {
              props.setSelected(index);
            }
          });
        }
        if (!res.success) {
          const notFound = document.getElementsByClassName("notFound");
          props.setFlags((prev) => {
            return {
              networkError: false,
              searchFound: !prev.searchFound,
            };
          });
          setTimeout(() => {
            notFound[0].style.display = "none";
          }, 2500);
        }
        props.setBagHistory(res);
      })
      .catch((error) => {
        const notFound = document.getElementsByClassName("notFound");
        props.setFlags((prev) => {
          return {
            searchFound: !prev.searchFound,
            networkError: true,
          };
        });
        setTimeout(() => {
          notFound[0].style.display = "none";
        }, 2500);
        console.log(error);
      });
  };

  function handleClick(event) {
    const { name } = event.currentTarget;
    setSearch((prevSearch) => ({
      ...prevSearch,
      [name]: !prevSearch .advanceSearch,
    }));
  }

  function handleChange(event) {
    const { value, name } = event.currentTarget;
    setSearch((prevSearch) => ({
      ...prevSearch,
      [name]: value,
    }));
  }

  return (
    <>
      <div id="searchContainer" className="container">
        <motion.div
          key={search.advanceSearch}
          initial={{
            height: 100,
          }}
          animate={{
            height: 150,
          }}
          transition={{
            duration: 1,
          }}
          className="searchFlex"
        >
          <div className="mainSearch">
            <div className="input">
              <label htmlFor="bagTagNumber" className="label">
                Bag Tag Number:
              </label>
              <input
                id="bagTagNumber"
                name="bagTagNumber"
                type="text"
                value={search.bagTagNumber}
                placeholder="eg: 0137123456"
                onChange={handleChange}
              />
            </div>
            {search.advanceSearch && (
              <motion.div
                key={search.advanceSearch}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 1,
                }}
                className="input"
              >
                <label htmlFor="surName" className="label">
                  Surname:
                </label>
                <input
                  id="surName"
                  name="surName"
                  type="text"
                  value={search.surName}
                  placeholder="eg: Mourya"
                  onChange={handleChange}
                />
              </motion.div>
            )}
          </div>
          <div className="advanceSearchElements">
            <div className="input">
              <label htmlFor="date" className="label">
                Date:
              </label>
              <input
                id="date"
                name="date"
                type="date"
                value={search.date}
                onChange={handleChange}
              />
            </div>

            {search.advanceSearch && (
              <motion.div
                key={search.advanceSearch}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 1,
                }}
                className="input"
              >
                <label htmlFor="pnr" className="label">
                  PNR:
                </label>
                <input
                  id="pnr"
                  name="pnr"
                  type="text"
                  value={search.pnr}
                  placeholder="eg: PQ24T"
                  onChange={handleChange}
                />
              </motion.div>
            )}
          </div>
          <div>
            <input
              id="advanceSearch"
              type="checkbox"
              name="advanceSearch"
              checked={search.advanceSearch}
              onChange={handleClick}
            />
            <label htmlFor="advanceSearch" className="advaneSearch">
              Advance Search
            </label>
          </div>
        </motion.div>
        <motion.button
          whileHover={{
            scale: 1.2,
          }}
          onClick={handleSubmit}
          className="searchButton"
        >
          Submit
        </motion.button>
      </div>
    </>
  );
}
