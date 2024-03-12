import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function OperationForm({ setIsShowed, getOperations, operation, method, setOperations, operations }) {
    const [selectedState, setSelectedState] = React.useState("In corso");
    const [inputOperation, setInputOperation] = React.useState({
        name: "",
        description: "",
        date: "",
        deliveryTime: "",
        state: selectedState
    });

    function handleCloseClick() {
        setIsShowed(false);
    }

    function handleChanges(event) {
        const { name, value } = event.target;

        setInputOperation((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            };
        });
    }

    function handleSelectChange(event) {
        setSelectedState(event.target.value);

        setInputOperation((prevValue) => {
            return {
                ...prevValue,
                state: event.target.value
            };
        });
    }

    async function addOperation() {
        try {
            const response = await axios.post("http://localhost:5000/api/addOperation", inputOperation);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function editOperation(id) {
        try {
            const response = await axios.patch(`http://localhost:5000/api/updateOperation/${id}`, inputOperation);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    function handleAddSubmit(event) {
        event.preventDefault();

        addOperation();

        setInputOperation({
            name: "",
            description: "",
            date: "",
            deliveryTime: "",
            state: selectedState
        });

        setIsShowed(false);
        getOperations();
    }

    function handleEditSubmit() {
        const id = operation.id;

        editOperation(id);
        setOperations((prevValue) => {
            return prevValue.map((operation) => {
                if (operation.id === id) {
                    return {
                        ...operation,
                        name: inputOperation.name,
                        description: inputOperation.description,
                        date: inputOperation.date,
                        deliveryTime: inputOperation.deliveryTime,
                        state: inputOperation.state
                    };
                } else {
                    return operation;
                }
            });
        });

        setIsShowed(false);
    }

    return (
        <form className="add-form" onSubmit={method === "edit" ? handleEditSubmit : handleAddSubmit}>
            <div className="form-header">
                <h2>{method === "edit" ? `Modifica intervento: ${operation.name}` : "Aggiungi intervento"}</h2>
                <button onClick={handleCloseClick} className="close-btn">
                    <FontAwesomeIcon className="x-icon" icon={faXmark} />
                </button>
            </div>
            <div className="form-inputs">
                <div className="form-block">
                    <label htmlFor="name">Nome</label>
                    <input className="full-width" type="text" id="name" name="name" value={inputOperation.name} onChange={handleChanges}  />
                </div>
                <div className="form-block">
                    <label htmlFor="description">Descrizione</label>
                    <textarea type="text" id="description" name="description" value={inputOperation.description} onChange={handleChanges} />
                </div>
                <div className="inline-inputs">
                    <div className="form-block">
                        <label htmlFor="date">Data di creazione:</label>
                        <input type="text" id="date" name="date" value={inputOperation.date} onChange={handleChanges} placeholder="Formato: 'gg/mm/aa'" />
                    </div>
                    <div className="form-block">
                        <label htmlFor="deliveryTime">Data di consegna:</label>
                        <input type="text" id="deliveryTime" name="deliveryTime" value={inputOperation.deliveryTime} onChange={handleChanges} placeholder="Formato: 'gg/mm/aa'" />
                    </div>
                </div>
                <div className="form-block">
                    <label htmlFor="description">Stato</label>
                    <select id="state" name="state" value={selectedState} onChange={handleSelectChange}>
                        <option value="In corso">In corso</option>
                        <option value="Completato">Completato</option>
                        <option value="Da fare">Da fare</option>
                    </select>
                </div>
            </div>
            <div className="form-submit">
                <button type="submit" className="submit-btn">{method === "edit" ? "Modifica" : "Aggiungi"}</button>
            </div>
        </form>
    );
}

export default OperationForm;