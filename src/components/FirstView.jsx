import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import logo from "../images/logo.svg";

import Operation from "./Operation";
import OperationForm from "./OperationForm";

function FirstView() {
  const [operations, setOperations] = React.useState([]);
  const [isAddShowed, setIsAddShowed] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  function handleAddClick() {
    setIsAddShowed(true);
  }

  async function fetchOperations() {
    try {
      const response = await axios.get(
        "https://gestionaleworkflow-moschiniadvcom-be.onrender.com/api/getOperations"
      );
      setOperations(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchOperations();
  }, []);

  return (
    <section className="first-view">
      <div className="first-view-header">
        <div className="header-content">
            <img className="logo" src={logo} alt="Logo" />
            <h2 className="view-title">Workflow</h2>
        </div>
        <button onClick={handleAddClick} className="add-btn">
          Aggiungi nuovo <FontAwesomeIcon className="plus-icon" icon={faPlus} />
        </button>
      </div>
      <div className="events-container">
        {loading && (
          <div className="loading-container">
            <div className="spinner-border text-dark" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        {operations.length === 0 && <p>Non ci sono interventi.</p>}
        {operations.map((operation) => (
            console.log(operation)
        ))}
        {operations.map((operation) => (
          <Operation
            key={operation.id}
            operation={operation}
            operations={operations}
            setOperations={setOperations}
            fetchOperations={fetchOperations}
          />
        ))}
      </div>

      {isAddShowed ? (
        <div className="add-overlay">
          <OperationForm
            setIsShowed={setIsAddShowed}
            setOperations={setOperations}
            fetchOperations={fetchOperations}
          />
        </div>
      ) : null}
    </section>
  );
}

export default FirstView;
