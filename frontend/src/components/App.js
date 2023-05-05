import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import '../pages/index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from "./ProtectedRoute";
import { register, authorize, checkToken } from "../utils/auth";
import InfoTooltip from './InfoTooltip';
import { setToken, getToken, removeToken } from "../utils/token";

function App() {

    const [currentUser, setCurrentUser] = useState('');

    const [isEditAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
    const [cardForDelete, setCardForDelete] = useState({})
    const [selectedCard, setSelectedCard] = useState({});
    const [cards, setCards] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const [isInfoTooltipSucceed, setIsInfoTooltipSucceed] = useState({
        isOpen: false,
        isSucceed: false,
    });

    const navigate = useNavigate();

    const handleLoggedIn = () => {
        setLoggedIn(true);
    };

    const checkAuth = (token) => {
        checkToken(token)
            .then((data) => {
                if (data.data) {
                    setEmail(data.data.email);
                    handleLoggedIn();
                    navigate("/");
                }
            })
            .catch(err => console.log(`Ошибка.....: ${err}`));
    };

    const tokenCheck = () => {
        const jwt = getToken();
        if (jwt) {
            checkAuth(jwt)
        } else {
            navigate("/sign-in");
        }
    };

    const handleRegister = (password, email) => {
        register(password, email)
            .then((res) => {
                if (res) {
                    navigate("/sign-in");
                    setIsInfoTooltipSucceed({
                        isOpen: true,
                        isSucceed: true,
                    });
                }
            })
            .catch((err) => {
                console.log(`Ошибка.....: ${err}`);
                setIsInfoTooltipSucceed({
                    isOpen: true,
                    isSucceed: false,
                });
            });
    };

    const handleLogin = (password, email) => {
        authorize(password, email)
            .then((res) => {
                if (res) {
                    setToken(res.token);
                    checkAuth(res.token);
                }
            })
            .catch((err) => {
                console.log(`Ошибка.....: ${err}`);
                setIsInfoTooltipSucceed({
                    isOpen: true,
                    isSucceed: false,
                });
            });
    };

    const handleSignOut = () => {
        removeToken();
        setEmail("");
        setLoggedIn(false);
    };

    useEffect(() => {
        tokenCheck();
    }, []);

    useEffect(() => {
        if (loggedIn) {
            api.getUserData()
                .then(res => {
                    setCurrentUser(res)
                })
                .catch(err => console.log(`Ошибка.....: ${err}`));
        }
    }, [loggedIn])

    useEffect(() => {
        if (loggedIn) {
            api.getCards()
                .then((res) => {
                    setCards(res);
                })
                .catch((err) => console.log(`Ошибка.....: ${err}`));
        }
    }, [loggedIn]);

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
            .catch((err) => console.log(`Ошибка.....: ${err}`));;
    }

    function handleCardDelete(evt) {
        evt.preventDefault();
        api.deleteCard(cardForDelete._id)
            .then(() => {
                const newCards = cards.filter((item) => item !== cardForDelete);
                setCards(newCards);
                closeAllPopups();
            })
            .catch((err) => console.log(`Ошибка.....: ${err}`));
    }

    function handleUpdateUser(user) {
        api.editProfile(user.name, user.about)
            .then(res => {
                setCurrentUser(res);
                closeAllPopups()
            })
            .catch((err) => console.log(`Ошибка.....: ${err}`));
    }

    function handleUpdateAvatar(user) {
        api.changeAvatar(user.avatar)
            .then(res => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => console.log(`Ошибка.....: ${err}`));
    }

    function handleAddPlace(card) {
        api.createCard(card.name, card.link)
            .then(res => {
                setCards([res, ...cards]);
                closeAllPopups();
            })
            .catch(err => console.log(`Ошибка.....: ${err}`))
    }

    function handleEditAvatarClick() {
        setIsAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardDeleteRequest(card) {
        setCardForDelete(card);
        setIsConfirmPopupOpen(true);
    }

    function handleCardClick(evt) {
        setSelectedCard(evt.target);
    }

    function closeAllPopups() {
        setIsAddPlacePopupOpen(false);
        setIsAvatarPopupOpen(false);
        setIsProfilePopupOpen(false);
        setIsConfirmPopupOpen(false);
        setSelectedCard({});
        setIsInfoTooltipSucceed({
            ...isInfoTooltipSucceed,
            isOpen: false,
        });
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="root">

                <Routes>
                    <Route
                        exact
                        path="/"
                        element={
                            <ProtectedRoute
                                element={Main}
                                loggedIn={loggedIn}
                                email={email}
                                onEditAvatar={handleEditAvatarClick}
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onCardClick={handleCardClick}
                                cards={cards}
                                onCardLike={handleCardLike}
                                onCardDeleteRequest={handleCardDeleteRequest}
                                onSignOut={handleSignOut}
                            />
                        }
                    />
                    <Route
                        path="/sign-in"
                        element={
                            <>
                                <Header>
                                    <Link className="header__link" to="/sign-up">
                                        Регистрация
                                    </Link>
                                </Header>
                                <Login onLogin={handleLogin} />
                            </>
                        }
                    />
                    <Route
                        path="/sign-up"
                        element={
                            <>
                                <Header>
                                    <Link className="header__link" to="/sign-in">
                                        Войти
                                    </Link>
                                </Header>
                                <Register onRegister={handleRegister} />
                            </>
                        }
                    />
                </Routes>

                <Footer />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlace}
                />

                <ConfirmPopup
                    isOpen={isConfirmPopupOpen}
                    onClose={closeAllPopups}
                    onSubmit={handleCardDelete}
                    title="Вы уверены?"
                    buttonText="Да"
                />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />

                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />

                <InfoTooltip
                    isOpen={isInfoTooltipSucceed.isOpen}
                    onClose={closeAllPopups}
                    isSucceed={isInfoTooltipSucceed.isSucceed}
                />

            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;