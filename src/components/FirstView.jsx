import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Operation from "./Operation";
import OperationForm from "./OperationForm";

function FirstView({ isConnected }) {
    const [operations, setOperations] = React.useState([]);
    const [isAddShowed, setIsAddShowed] = React.useState(false);

    async function getOperations() {
        try {
            const response = await axios.get("http://localhost:5000/api/getOperations");
            setOperations(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    function handleAddClick() {
        setIsAddShowed(true);
    }

    React.useEffect(() => {
        getOperations();
    }, []);

    return (
        <section className="first-view">
            <div className="first-view-header">
                <h2 className="view-title">Workflow</h2>
                <button onClick={handleAddClick} className="add-btn">
                    Aggiungi nuovo <FontAwesomeIcon className="plus-icon" icon={faPlus} />
                </button>   
            </div>
            <div className="events-container">
                {operations.length === 0 && <p>Non ci sono interventi.</p>}
                {operations.map((operation) => (
                    <Operation key={operation.id} operation={operation} operations={operations} setOperations={setOperations} />
                ))}
            </div>

            {isAddShowed ? 
                <div className="add-overlay">
                    <OperationForm setIsShowed={setIsAddShowed} getOperations={getOperations} />
                </div> : null}
            {!isConnected && 
                <div className="no-see-overlay">
                    <p>Esegui l'accesso per visualizzare <br></br> (in alto a destra)</p>
                </div>}
        </section> 
    );
}

export default FirstView;