import React from 'react';
import logo from '../images/Logo.svg';
import { Link } from "react-router-dom";

function Header(props) {
    const [isBurgerOpened, setIsBurgerOpened] = React.useState(false);

    const BurgerMenuClassName = `header__list ${isBurgerOpened && "header__list_opened"}`;
    const BurgerButtonClassName = `header__burger-button ${isBurgerOpened && "header__burger-button_hidden"}`;
    const CloseBurgerButtonClassName = `header__close-burger-button ${isBurgerOpened && "header__close-burger-button_visible"}`;
    const openBurgerMenu = () => {
        setIsBurgerOpened(true);
    };
    const closeBurgerMenu = () => {
        setIsBurgerOpened(false);
    };

    return (
        <header className="header">
            {props.loggedIn ? (
                <>
                    <div className='header__wrap'>
                        <img className="header__logo" src={logo} alt="Лого" />
                        <button className={BurgerButtonClassName} onClick={openBurgerMenu}></button>
                        <button className={CloseBurgerButtonClassName} onClick={closeBurgerMenu}></button>
                    </div>

                    <div className={BurgerMenuClassName}>
                        <p className="header__email">{props.email}</p>
                        <Link className="header__link-list" onClick={props.onSignOut} to="/sign-in">
                            Выйти
                        </Link>
                    </div>
                </>
            ) : (
                <>
                    <div className="header__top">
                        <img src={logo} alt="лого" className="logo" /> {props.children}
                    </div>
                </>
            )}
        </header>
    );
}

export default Header;