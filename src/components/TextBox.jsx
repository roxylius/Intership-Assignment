import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";


const TextBox = ({ id, position, styles, isSelected, onClick }) => {
    const [isTextBoxSelected, setIsTextBoxSelected] = useState(isSelected);

    const handleClick = () => {
        setIsTextBoxSelected(!isTextBoxSelected);
        onClick(id);
    };

    useEffect(() => {
        // Deselect the text box when another one is selected
        setIsTextBoxSelected(isSelected);
    }, [isSelected]);

    return (
        <Draggable
            axis="both"
            handle=".handle"
            defaultPosition={{ x: position.x, y: position.y }}
            position={null}
            bounds="parent"
            grid={[1, 1]}
            scale={1}
            allowAnyClick={Boolean}
        >
            <div
                className={`drag-items handle ${isTextBoxSelected ? "selected" : ""}`}
                contentEditable="true"
                suppressContentEditableWarning={true}
                style={styles}
                onClick={handleClick}
            >
                <div>This is a new textbox</div>
            </div>
        </Draggable>
    );
};

export default TextBox;
