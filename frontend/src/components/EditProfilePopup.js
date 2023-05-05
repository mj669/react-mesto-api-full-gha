import React, { useState, useContext, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {

    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen])

    function handleUserName(evt) {
        setName(evt.target.value)
    }

    function handleUserDescription(evt) {
        setDescription(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onUpdateUser({
            name: name,
            about: description
        });
    }

    return (
        <PopupWithForm
            name="edit-profile"
            title="Редактировать профиль"
            isOpen={props.isOpen}
            onClose={props.onClose}
            buttonText="Сохранить"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                className="popup__text popup__text_type_name"
                name="name"
                placeholder="Имя"
                required
                minLength="2"
                maxLength="40"
                id="name-input"
                onChange={handleUserName}
                value={name || ''}
            />
            <span className="popup__text-error name-input-error"></span>
            <input
                type="text"
                className="popup__text popup__text_type_about"
                name="about"
                placeholder="О себе"
                required
                minLength="2"
                maxLength="200"
                id="about-input"
                onChange={handleUserDescription}
                value={description || ''}
            />
            <span className="popup__text-error about-input-error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
