import React from "react";
import ApiCalendar from "react-google-calendar-api";

import Event from "./Event";

const config = {
    "clientId": "943781260211-e81cm2qocd85jjbtr6gn8j9pg1aflti2.apps.googleusercontent.com",
    "apiKey": "AIzaSyD2nMI092OI8TELfYcEtOdVIdhvrRQ6OIQ",
    "scope": "https://www.googleapis.com/auth/calendar.events",
    "discoveryDocs": ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
}

const apiCalendar = new ApiCalendar(config);

function SecondView({ isConnected, setIsConnected }) {
    const [events, setEvents] = React.useState([]);

    function handleLoginClick() {
        apiCalendar.handleAuthClick()
            .then(() => {
                console.log("Accesso effettuato con successo");
                setIsConnected(true);
                return apiCalendar.listUpcomingEvents();
            })
            .then((response) => {
                const events = new Set();

                const uniqueEvents = response.result.items.filter((event) => {
                    if (events.has(event.summary)) {
                        return false;
                    } else {
                        events.add(event.summary);
                        return true;
                    }
                });

                console.log("Eventi unici: ", uniqueEvents);

                setEvents(uniqueEvents);
            })
            .catch((error) => {
                console.log("Errore durante l'accesso: ", error);
            });
    }

    return (
        <section className="second-view">
            <div className="second-view-header">
                <h2 className="view-title">Prossimi Eventi</h2>
                {!isConnected ? <button onClick={handleLoginClick} className="add-btn">
                    Connetti Google Calendar
                </button> : null}
            </div>
            <ul>
                {events.map((event, index) => (
                    <Event key={index} event={event} />
                ))}
            </ul>
        </section>
    );
}

export default SecondView;