import axios from "axios";

const BASE_URL = "http://localhost:8080/v1";
const URL = "/bim";

const api = axios.create({
  baseURL: BASE_URL,
  url: URL,
});

const getBagHistory = (bagTagNumber, date, surname, pnr) => {
  return api.get(URL, {
    baseURL: BASE_URL,
    params: {
      bagTagNumber,
      date,
      lastname: surname,
      pnr,
    },
  });
};

const matchData = (data) => {
  const bagTagEvents = [...data.bagTagEvents];
  let airortDataEventsList = new Map();
  bagTagEvents.map((event) => {
    let airportEvent = airortDataEventsList.get(event.eventStation);
    if (airportEvent == null || airportEvent == undefined) {
      let evt = {};
      if (event.baggageSourceIndicator == "L") {
        evt.source = event.eventStation;
        evt.destination = event.flightInformation.outbound.destinationAirport;
        evt.events = [event];
        evt.isSelected = true;
      }
      if (event.baggageSourceIndicator == "T") {
        evt.source = event.eventStation;
        evt.previousHandlingStation =
          event.flightInformation.inbound.sourceAirport;
        evt.destination = event.flightInformation.outbound.destinationAirport;
        evt.events = [event];
        evt.isSelected = false;
      }
      if (event.baggageSourceIndicator == "X") {
        evt.source = event.flightInformation.inbound.sourceAirport;
        evt.destination = event.eventStation;
        evt.events = [event];
        evt.isSelected = false;
      }

      airortDataEventsList.set(event.eventStation, evt);
    } else {
      airportEvent.events = [...airportEvent.events, event];
    }
  });

  if (bagTagEvents.length == 1) {
    const event = bagTagEvents[0];
    if (event.flightInformation.outbound != null) {
      airortDataEventsList.set(
        event.flightInformation.outbound.destinationAirport,
        {
          source: event.eventStation,
          destination: event.flightInformation.outbound.destinationAirport,
          events: [],
          isSelected: false,
        }
      );
    }
    if (event.flightInformation.onwards != null) {
      const onwards = event.flightInformation.onwards;
      window.alert(onwards);
      onwards.forEach((flight) => {
        airortDataEventsList.set(flight.destinationAirport, {
          source: event.flightInformation.outbound.destinationAirport,
          destination: flight.destinationAirport,
          events: [],
          isSelected: false,
        });
      });
    }
  }

  return airortDataEventsList;
};

export default {
  getBagHistory,
  matchData,
};
