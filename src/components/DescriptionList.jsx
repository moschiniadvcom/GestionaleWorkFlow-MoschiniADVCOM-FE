import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function DescriptionList({ descriptionItems, setDescriptionItems, type }) {
  function handleDescriptionRemove(id) {
    setDescriptionItems((prevDescriptionItems) => {
      return prevDescriptionItems.filter(
        (description) => description.id !== id
      );
    });
  }

  return (
    <ul className="description-list">
      {descriptionItems.map((description) => (
        <li key={description.id}>
          {description.description
            ? description.description
            : description
            ? description
            : "Vuoto"}{" "}
          {type !== "operation" && (
            <FontAwesomeIcon
              onClick={() => handleDescriptionRemove(description.id)}
              icon={faXmark}
              style={{ width: ".625rem", cursor: "pointer" }}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

export default DescriptionList;
