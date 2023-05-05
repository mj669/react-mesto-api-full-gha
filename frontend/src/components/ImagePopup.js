import React from 'react';

function ImagePopup({card, onClose}) {
    return (
        <div className={`popup  ${card.src && "popup_opened"}`}>
            <div className="popup__container-view-img">
                <button className="popup__close popup__close-view" type="button" onClick={onClose}></button>
                <figure className="popup__figure">
                    <img className="popup__img" src={card.src} alt={card.alt} />
                    <figcaption className="popup__figcaption">{card.alt}</figcaption>
                </figure>
            </div>
        </div>
    );
}

export default ImagePopup;