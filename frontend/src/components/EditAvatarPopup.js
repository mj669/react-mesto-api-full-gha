import React, { useState, useEffect, useRef } from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

    const avatarRef = useRef('');
    const [avatar, setAvatar] = useState('');

    function handleChangeAvatar(evt) {
        setAvatar(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value
        });
    }

    useEffect(() => {
        setAvatar('')
    }, [props.isOpen])

    return (
        <PopupWithForm
            name="change-avatar"
            title="Обновить аватар"
            isOpen={props.isOpen}
            onClose={props.onClose}
            buttonText="Сохранить"
            onSubmit={handleSubmit}
        >
            <input
                type="url"
                className="popup__text popup__text_type_link"
                name="avatar"
                placeholder="Ссылка на аватар"
                required
                id="avatar-input"
                ref={avatarRef}
                onChange={handleChangeAvatar}
                value={avatar ? avatar : ''}
            />
            <span className="popup__text-error avatar-input-error"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
