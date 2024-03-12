import React from "react";
import axios from "axios";

import OperationForm from "./OperationForm";

function Operation({ operation, operations, setOperations }) {
    const [isEditShowed, setIsEditShowed] = React.useState(false);

    function handleEditClick() {
        setIsEditShowed(true);
    }

    async function handleDeleteClick() {
        const id = operation.id;
        await axios.delete(`https://gestionaleworkflow-moschiniadvcom-be.onrender.com/api/deleteOperation/${id}`);

        const newOperation = operations.filter((operation) => operation.id !== id);
        setOperations(newOperation);
    }

    async function handleCompletedStateChange() {
        const id = operation.id;
        const newOperation = { ...operation, state: "Completato" };

        await axios.patch(`https://gestionaleworkflow-moschiniadvcom-be.onrender.com/api/updateStateOperation/${id}`, newOperation);
        setOperations(operations.map((operation) => 
            operation.id === id ? newOperation : operation
        ));
    }

    return (
        <div className={operation.state === "Completato" ? "event event-completed" 
                        : operation.state === "In corso" ? "event event-in-progress"
                        : operation.state === "Da fare" ? "event event-to-do"
                        : "event"}>
            <div className="event-header">
                <h3>{operation.name ? operation.name : "Senza nome"}</h3>
                <p className={operation.state === "Completato" ? "highlight-green"
                    : operation.state === "In corso" ? "highlight-yellow"
                    : operation.state === "Da fare" ? "highlight-red"
                    : null}>{operation.state ? operation.state.toUpperCase() : "--"}</p>
            </div>

            <div className="event-details">
                <p>{operation.description ? operation.description : "Senza descrizione"}</p>
            </div>

            {operation.state !== "Completato" ? 
                <div className="event-schedules">
                    <p>Da consegnare: {operation.deliveryTime ? operation.deliveryTime : "--"}</p>
                </div>
            : null }

            <div className="event-footer">
                {operation.state !== "Completato" ? 
                    <>
                    <button className="complete-btn" onClick={handleCompletedStateChange}>Segna come completato</button>
                    <button onClick={handleEditClick} className="edit-btn">Modifica</button>
                    </> : null
                }
                <button className="delete-btn" onClick={handleDeleteClick}>Elimina intervento</button>
            </div>

            {isEditShowed ? 
                <div className="add-overlay">
                    <OperationForm setIsShowed={setIsEditShowed} operation={operation} method="edit" setOperations={setOperations} operations={operations} />
                </div> : null}
        </div>
    );
}

export default Operation;