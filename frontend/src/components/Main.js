import React, { useContext } from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Header from './Header';

function Main(props) {

    const currentUser = useContext(CurrentUserContext);

    return (
        <>
            <Header
                loggedIn={props.loggedIn}
                email={props.email}
            />
            <main className="content">
                <section className="profile">
                    <div className="profile__wrap">
                        <div className="profile__wrap-avatar">
                            <img className="profile__image" src={`${currentUser.avatar}`} alt="Аватар" onClick={props.onEditAvatar} />
                            <img className="profile__image-icon" src="./images/PencilAvatar.svg" alt="Иконка редактирования" />
                        </div>
                        <div className="profile__info">
                            <h1 className="profile__title">{currentUser.name}</h1>
                            <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
                            <p className="profile__subtitle">{currentUser.about}</p>
                        </div>
                    </div>
                    <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
                </section>
                <section className="gallery">
                    {
                        props.cards.map(card => (
                            <Card
                                card={card}
                                key={card._id}
                                onCardClick={props.onCardClick}
                                onCardLike={props.onCardLike}
                                onCardDeleteRequest={props.onCardDeleteRequest}
                            />
                        ))
                    }
                </section>
            </main>
        </>
    );
}

export default Main;