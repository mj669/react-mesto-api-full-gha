import React from "react";
import successIcon from '../images/Success.svg';
import failIcon from '../images/Error.svg';

function InfoTooltip({ onClose, isOpen, isSucceed }) {
    const sectionClassName = `infoTooltip ${isOpen && "infoTooltip_opened"}`;

    return (
        <section className={sectionClassName} onClick={onClose}>
            <div className="infoTooltip__overlay"></div>
            <div className="infoTooltip__container">
                <button className="infoTooltip__exit-button" type="button" onClick={onClose}></button>
                {isSucceed ? (
                    <>
                        <img
                            className="infoTooltip__img"
                            src={successIcon}
                            alt="Вы успешно зарегистрировались!"
                        />
                        <p className="infoTooltip__tip">Вы успешно зарегистрировались!</p>
                    </>
                ) : (
                    <>
                        <img
                            className="infoTooltip__img"
                                src={failIcon}
                            alt="Что-то пошло не так! Попробуйте ещё раз."
                        />
                        <p className="infoTooltip__tip">Что-то пошло не так! Попробуйте ещё раз.</p>
                    </>
                )}
            </div>
        </section>
    );
}

export default InfoTooltip;