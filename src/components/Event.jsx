import React from "react";

function Event({ event }) {
    return (
        <li className="google-event">
            <p><strong>{event.summary}</strong></p> <br />
            <div class="google-schedules">
                <div class="google-start-schedule">
                    {event.start.dateTime ?
                        <>
                            <span>Data inizio: {new Date(event.start.dateTime).toLocaleDateString()}</span>
                            <span> - Ora inizio: {new Date(event.start.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </> :
                        <span>Data inizio: {new Date(event.start.date).toLocaleDateString()}</span>
                    }
                </div>
                <div class="google-end-schedule">
                    {event.end.dateTime ?
                        <>
                            <span>Data fine: {new Date(event.end.dateTime).toLocaleDateString()}</span>
                            <span> - Ora fine: {new Date(event.end.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </> :
                        <span>Data fine: {new Date(event.end.date).toLocaleDateString()}</span>
                    }
                </div>
            </div>
        </li>
    );
}

export default Event;