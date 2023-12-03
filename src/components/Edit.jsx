import React, { useState } from "react";
import Select from 'react-select';

//components
import TextBox from "./TextBox"; // Fix casing issue

//css and styling
import "./css/edit.css";

//options for drop down menus
import colorOptions from "./resources/colorOptions";
import fontOptions from "./resources/fontOptions";
import sizeOptions from "./resources/sizeOptions";

const Edit = () => {
    //store all the changes
    const [selectedOption, setSelectedOption] = useState({ font: '', size: null, color: '' });

    //stores all text boxes added
    const [textboxes, setTextboxes] = useState([]);
    const [nextTextboxId, setNextTextboxId] = useState(1); //used to create new Textbox
    const [selectedTextboxId, setSelectedTextboxId] = useState(null);

    //add new text boxes
    const addTextbox = () => {
        setTextboxes((prevTextboxes) => [
            ...prevTextboxes,
            {
                id: nextTextboxId,
                position: { x: 5, y: 5 },
            },
        ]);
        setNextTextboxId((prevId) => prevId + 1);
    };

    //selects text box for changing its values
    const handleTextBoxClick = (id) => {
        setSelectedTextboxId(id);
    };


    //handles styles of selected textbox after drop down changes
    const handleDropdownChange = (selected) => {
        if (selectedTextboxId !== null) {
            // Update styles of the selected textbox
            setTextboxes((prevTextboxes) => {
                const updatedTextboxes = prevTextboxes.map((textbox) => {
                    if (textbox.id === selectedTextboxId) {
                        return {
                            ...textbox,
                            styles: {
                                ...textbox.styles,
                                [selected.menu]: selected.value,
                            },
                        };
                    }
                    return textbox;
                });
                return updatedTextboxes;
            });
        }
    };

    return (
        <>
            <div className="container panel">
                {textboxes.map((textbox) => (
                    <TextBox
                        key={textbox.id}
                        id={textbox.id}
                        position={textbox.position}
                        styles={textbox.styles}
                        isSelected={selectedTextboxId === textbox.id}
                        onClick={() => handleTextBoxClick(textbox.id)}
                    />
                ))}
            </div>

            <div className="tools">
                <h2>FONT</h2>
                <Select
                    onChange={(selected) => {
                        setSelectedOption((prev) => ({ ...prev, font: selected.value }));
                        handleDropdownChange({ menu: "fontFamily", value: selected.value });
                    }}
                    options={fontOptions}
                    className="select"
                />
                <h2>Color</h2>
                <Select
                    onChange={(selected) => {
                        setSelectedOption((prev) => ({ ...prev, color: selected.value }));
                        handleDropdownChange({ menu: "color", value: selected.value });
                    }}
                    options={colorOptions}
                    className="select"
                />
                <h2>Size</h2>
                <Select
                    onChange={(selected) => {
                        setSelectedOption((prev) => ({ ...prev, size: selected.value }));
                        handleDropdownChange({ menu: "fontSize", value: selected.value });
                    }}
                    options={sizeOptions}
                    className="select"
                />
                <div className="addText" onClick={addTextbox}>
                    <span className="material-symbols-outlined">
                        add
                    </span>
                    <h2>Add Text</h2>
                </div>
            </div>
        </>
    );
}

export default Edit;
