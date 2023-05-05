import React, { useContext } from "react";
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(props) {

    const currentUser = useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `gallery__delete ${isOwn && 'gallery__delete_active'}`
    );
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `gallery__like ${isLiked && 'gallery__like_active'}`
    );

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    function handleDeleteRequest() {
        props.onCardDeleteRequest(props.card)
    }

    return (
        <div className="gallery__card">
            <button className={cardDeleteButtonClassName} onClick={handleDeleteRequest} type="button"></button>
            <img className="gallery__image" src={props.card.link} alt={props.card.name} onClick={props.onCardClick} />
            <div className="gallery__info">
                <h2 className="gallery__title">{props.card.name}</h2>
                <div className="gallery__like-wrapper">
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
                    <p className="gallery__like-counter">{props.card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}


export default Card;