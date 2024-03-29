import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function OperationForm({ setIsShowed, getOperations, operation, method, setOperations, setLoading }) {
    const [selectedState, setSelectedState] = React.useState("In corso");
    const [inputOperation, setInputOperation] = React.useState({
        name: "",
        description: "",
        delivery_time: "",
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

    async function handleAddSubmit(event) {
        event.preventDefault();

        try {
            setLoading(true);
            const response = await axios.post("https://gestionaleworkflow-moschiniadvcom-be.onrender.com/api/addOperation", inputOperation);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

        setInputOperation({
            name: "",
            description: "",
            delivery_time: "",
            state: selectedState
        });

        setIsShowed(false);
        getOperations();
    }

    async function handleEditSubmit(event) {
        event.preventDefault();

        const id = operation.id;

        try {
            const response = await axios.put(`https://gestionaleworkflow-moschiniadvcom-be.onrender.com/api/updateOperation/${id}`, inputOperation);
            console.log(response.data);

            setOperations((prevValue) => {
                return prevValue.map((operation) => {
                    if (operation.id === id) {
                        return {
                            ...operation,
                            name: inputOperation.name,
                            description: inputOperation.description,
                            delivery_time: inputOperation.delivery_time,
                            state: inputOperation.state
                        };
                    } else {
                        return operation;
                    }
                });
            });
        } catch (error) {
            console.log(error);
        }

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
                    <input type="text" id="name" name="name" value={inputOperation.name} onChange={handleChanges}  />
                </div>
                <div className="form-block">
                    <label htmlFor="description">Descrizione</label>
                    <textarea type="text" id="description" name="description" value={inputOperation.description} onChange={handleChanges} />
                </div>
                <div className="form-block">
                    <label htmlFor="delivery_time">Data di consegna:</label>
                    <input type="text" id="delivery_time" name="delivery_time" value={inputOperation.delivery_time} onChange={handleChanges} placeholder="Testo o 'gg/mm/aaaa'" />
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