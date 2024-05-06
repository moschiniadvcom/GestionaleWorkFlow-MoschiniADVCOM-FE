import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

import OperationForm from "./OperationForm";
import DescriptionList from "./DescriptionList";

function Operation({ operation, operations, setOperations, fetchOperations }) {
  const [isEditShowed, setIsEditShowed] = React.useState(false);
  const [iconLoading, setIconLoading] = React.useState(false);

  function handleEditClick() {
    setIsEditShowed(true);
  }

  async function handleDeleteClick(id) {
    try {
      setIconLoading(true);
      await axios.delete(`http://localhost:5000/api/deleteOperation/${id}`);

      setOperations(operations.filter((operation) => operation.id !== id));
    } catch (error) {
      console.error(error);
    } finally {
      setIconLoading(false);
    }
  }

  async function handleCompletedStateChange() {
    const id = operation.id;
    const newOperation = { ...operation, state: "Completato" };

    try {
      await axios.patch(
        `http://localhost:5000/api/updateStateOperation/${id}`,
        newOperation
      );

      setOperations(
        operations.map((operation) =>
          operation.id === id ? newOperation : operation
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className={
        operation.state === "Completato"
          ? "event event-completed"
          : operation.state === "In corso"
          ? "event event-in-progress"
          : operation.state === "Da fare"
          ? "event event-to-do"
          : "event"
      }
    >
      <div className="event-header">
        <h3>{operation.name ? operation.name : "Senza nome"}</h3>
        <p
          className={
            operation.state === "Completato"
              ? "highlight-green"
              : operation.state === "In corso"
              ? "highlight-yellow"
              : operation.state === "Da fare"
              ? "highlight-red"
              : null
          }
        >
          {operation.state ? operation.state.toUpperCase() : "--"}
        </p>
      </div>

      <div className="event-details">
        {operation.description.map((description, index) =>
          console.log(description)
        )}
        {operation.description.length > 0 ? (
          <DescriptionList
            descriptionItems={operation.description}
            type="operation"
          />
        ) : (
          <p>Nessuna descrizione</p>
        )}
      </div>

      {operation.state !== "Completato" ? (
        <div className="event-schedules">
          <p>
            Da consegnare:{" "}
            {operation.delivery_time ? operation.delivery_time : "--"}
          </p>
        </div>
      ) : null}

      <div className="event-footer">
        {operation.state !== "Completato" ? (
          <>
            <FontAwesomeIcon
              icon={faCheck}
              className="complete-btn"
              onClick={handleCompletedStateChange}
            />
            <FontAwesomeIcon
              icon={faPen}
              onClick={handleEditClick}
              className="edit-btn"
            />
          </>
        ) : null}
        {iconLoading ? (
          <div className="delete-btn" style={{ padding: "0.25rem 1rem" }}>
            <div
              className="spinner-border text-light"
              style={{ width: ".875rem", height: ".875rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <FontAwesomeIcon
            icon={faTrash}
            className="delete-btn"
            onClick={() => handleDeleteClick(operation.id)}
          />
        )}
      </div>

      {isEditShowed ? (
        <div className="add-overlay">
          <OperationForm
            setIsShowed={setIsEditShowed}
            operation={operation}
            method="edit"
            setOperations={setOperations}
            operations={operations}
            fetchOperations={fetchOperations}
          />
        </div>
      ) : null}
    </div>
  );
}

export default Operation;
