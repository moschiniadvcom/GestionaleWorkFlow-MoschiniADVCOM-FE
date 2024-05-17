import React from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import DescriptionList from "./DescriptionList";

function OperationForm({
  setIsShowed,
  operation,
  method,
  setOperations,
  fetchOperations,
}) {
  const [selectedState, setSelectedState] = React.useState("In corso");
  const [inputDescription, setInputDescription] = React.useState({
    id: uuidv4(),
    description: "",
  });
  const [descriptionItems, setDescriptionItems] = React.useState([]);
  const [inputOperation, setInputOperation] = React.useState({
    id: uuidv4(),
    name: "",
    description: descriptionItems,
    delivery_time: "",
    state: selectedState,
  });
  const [error, setError] = React.useState("");
  const [btnLoading, setBtnLoading] = React.useState(false);

  function handleCloseClick() {
    setIsShowed(false);
  }

  function handleOtherChanges(event) {
    setError("");
    setInputOperation((prevOperation) => {
      return {
        ...prevOperation,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleDescriptionChange(event) {
    setError("");
    setInputDescription((prevDescription) => {
      return {
        ...prevDescription,
        description: event.target.value,
      };
    });
  }

  function handleDescriptionSubmit(event) {
    event.preventDefault();

    if (!inputDescription.description) {
      setError("Inserisci una descrizione");
      return;
    }

    setDescriptionItems((prevDescriptionItems) => {
      return [...prevDescriptionItems, inputDescription];
    });

    setInputDescription({
      id: uuidv4(),
      description: "",
    });
  }

  function handleSelectChange(event) {
    setError("");
    setSelectedState(event.target.value);
    console.log(selectedState);
  }

  async function handleAddOperation(event) {
    event.preventDefault();

    if (!inputOperation.name) {
      setError("Inserisci un nome");
      return;
    }

    if (!inputOperation.delivery_time) {
      setError("Inserisci una data di consegna");
      return;
    }

    const newOperation = {
      id: uuidv4(),
      name: inputOperation.name,
      description: descriptionItems,
      delivery_time: inputOperation.delivery_time,
      state: selectedState,
    };

    try {
      setBtnLoading(true);
      const response = await axios.post(
        "https://gestionaleworkflow-moschiniadvcom-be.onrender.com/api/addOperation",
        newOperation
      );
      console.log(response);

      setOperations((prevOperations) => {
        return [...prevOperations, newOperation];
      });
    } catch (error) {
      console.error(error);
    } finally {
      setBtnLoading(false);
    }

    setInputOperation({
      name: "",
      description: [],
      delivery_time: "",
      state: "In corso",
    });

    setDescriptionItems([]);
    setSelectedState("In corso");
    setIsShowed(false);

    fetchOperations();
  }

  async function handleEditOperation(event) {
    event.preventDefault();

    const id = operation.id;
    const newOperation = {
      id: operation.id,
      name: inputOperation.name,
      description: descriptionItems,
      delivery_time: inputOperation.delivery_time,
      state: selectedState,
    };

    try {
      setBtnLoading(true);
      await axios.put(
        `https://gestionaleworkflow-moschiniadvcom-be.onrender.com/api/updateOperation/${id}`,
        newOperation
      );

      setOperations((prevOperations) => {
        return prevOperations.map((operation) =>
          operation.id === id ? newOperation : operation
        );
      });
    } catch (error) {
      console.error(error);
    } finally {
      setBtnLoading(false);
    }

    setInputOperation({
      name: "",
      description: [],
      delivery_time: "",
      state: "In corso",
    });

    setDescriptionItems([]);
    setSelectedState("In corso");
    setIsShowed(false);

    fetchOperations();
  }

  return (
    <form className="add-form" onSubmit={method === "edit" ? handleEditOperation : handleAddOperation}>
      {error && <p className="error">{error}</p>}
      <div className="form-header">
        <h2>
          {method === "edit"
            ? `Modifica intervento: ${operation.name}`
            : "Aggiungi intervento"}
        </h2>
        <button onClick={handleCloseClick} className="close-btn">
          <FontAwesomeIcon className="x-icon" icon={faXmark} />
        </button>
      </div>
      <div className="form-inputs">
        <div className="form-block">
          <label htmlFor="name">Nome*</label>
          <input
            type="text"
            id="name"
            name="name"
            value={inputOperation.name}
            onChange={handleOtherChanges}
          />
        </div>
        {descriptionItems.length > 0 && (
          <DescriptionList
            descriptionItems={descriptionItems}
            setDescriptionItems={setDescriptionItems}
          />
        )}
        <div className="form-block">
          <label htmlFor="description">Descrizione*</label>
          <div className="description">
            <input
              type="text"
              id="description"
              name="description"
              onChange={handleDescriptionChange}
              value={inputDescription.description}
            />
            <button onClick={handleDescriptionSubmit}>Aggiungi</button>
          </div>
        </div>
        <div className="form-block">
          <label htmlFor="delivery_time">Data di consegna*</label>
          <input
            type="date"
            id="delivery_time"
            name="delivery_time"
            value={inputOperation.delivery_time}
            onChange={handleOtherChanges}
          />
        </div>
        <div className="form-block">
          <label htmlFor="description">Stato*</label>
          <select
            id="state"
            name="state"
            value={selectedState}
            onChange={handleSelectChange}
          >
            <option value="In corso">In corso</option>
            <option value="Completato">Completato</option>
            <option value="Da fare">Da fare</option>
          </select>
        </div>
      </div>
      <div className="form-submit">
        <button type="submit" className="submit-btn" disabled={btnLoading}>
          {btnLoading ? (
            <div className="spinner-border text-light" role="status" style={{ width: '1rem', height: '1rem' }}>
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : method === "edit" ? (
            "Modifica"
          ) : (
            "Aggiungi"
          )}
        </button>
      </div>
    </form>
  );
}

export default OperationForm;
