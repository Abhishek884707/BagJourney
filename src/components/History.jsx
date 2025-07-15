import { motion } from "motion/react";

const History = (props) => {
  const size = props.events.size;
  let airport;
  let latestEvent;
  if (size > 0) {
    props.events.forEach((air) => {
      air.events.forEach((event) => {
        latestEvent = event.eventDescription;
      });
    });
    airport = props.events.get(props.selected);
  }

  return (
    <main className="container">
      {
        <>
          {airport.isSelected && (
            <>
              <div className="tile">
                <h1>
                  <span className="latestHndlUpd">Sou</span>
                  {" : "}
                  {airport.source}
                </h1>
                <h1>
                  <span className="latestHndlUpd">Latest Handeling Update</span>
                  {" : "}
                  {latestEvent}
                </h1>
                <h1>
                  <span className="latestHndlUpd">Des</span>
                  {" : "}
                  {airport.destination}
                </h1>
              </div>
              <table>
                <thead className="tableHeading">
                  <th>Date & Time</th>
                  <th>Event Description</th>
                  <th>PNR</th>
                  <th>Flight No.</th>
                  <th>Bag Status</th>
                  <th>(DPR) Refrence No.</th>
                  <th>Comments</th>
                </thead>
                <motion.tbody
                  key={props.selected}
                  initial={{
                    y: -200,
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 1.5,
                  }}
                >
                  {airport.events.map((event) => {
                    return (
                      <tr>
                        <td>{event.localDateTime}</td>
                        <td>{event.eventDescription}</td>
                        <td>{event.pnr}</td>
                        <td>
                          {event.baggageSourceIndicator == "L"
                            ? `${event.flightInformation.outbound.airline} ${event.flightInformation.outbound.flightNumber}`
                            : `${event.flightInformation.inbound.airline} ${event.flightInformation.inbound.flightNumber}`}
                        </td>
                        <td>{event.bagStatus}</td>
                        <td>{event.referenceNumber}</td>
                        <td>{event.comments}</td>
                      </tr>
                    );
                  })}
                </motion.tbody>
              </table>
            </>
          )}
        </>
      }
    </main>
  );
};

export default History;
