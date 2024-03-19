import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

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
                    <p>Da consegnare: {operation.delivery_time ? operation.delivery_time : "--"}</p>
                </div>
            : null }

            <div className="event-footer">
                {operation.state !== "Completato" ? 
                    <>
                    <FontAwesomeIcon icon={faCheck} className="complete-btn" onClick={handleCompletedStateChange} />
                    <FontAwesomeIcon icon={faPen} onClick={handleEditClick} className="edit-btn" />
                    </> : null
                }
                <FontAwesomeIcon icon={faTrash} className="delete-btn" onClick={handleDeleteClick} />
            </div>

            {isEditShowed ? 
                <div className="add-overlay">
                    <OperationForm setIsShowed={setIsEditShowed} operation={operation} method="edit" setOperations={setOperations} operations={operations} />
                </div> : null}
        </div>
    );
}

export default Operation;