import React, { useState, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeLink(evt) {
        setLink(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault(evt);
        props.onAddPlace({
            name: name,
            link: link,
        })
    }

    useEffect(() => {
        setName('')
        setLink('')
    }, [props.isOpen])

    return (
        <PopupWithForm
            name="add-card"
            title="Новое место"
            isOpen={props.isOpen}
            onClose={props.onClose}
            buttonText="Создать"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                className="popup__text popup__text_type_title"
                name="title"
                placeholder="Название"
                required
                minLength="2"
                maxLength="30"
                id="title-input"
                value={name}
                onChange={handleChangeName}
            />
            <span className="popup__text-error title-input-error"></span>
            <input
                type="url"
                className="popup__text popup__text_type_link"
                name="link"
                placeholder="Ссылка на картинку"
                required
                id="link-input"
                value={link}
                onChange={handleChangeLink}
            />
            <span className="popup__text-error link-input-error"></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
