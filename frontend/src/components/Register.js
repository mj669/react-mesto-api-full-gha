import React from "react";
import { Link } from "react-router-dom";

const Register = (props) => {
    const [data, setData] = React.useState({
        password: "",
        email: "",
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.onRegister(data.password, data.email);
    };

    return (
        <section className="register">
            <h2 className="register__title">Регистрация</h2>
            <form className="register__form" onSubmit={handleSubmit}>
                <fieldset className="register__inputs">
                    <label className="register__field">
                        <input
                            type="email"
                            id="email-input"
                            required
                            placeholder="Email"
                            value={data.email}
                            onChange={handleChange}
                            className="register__text register__text_type_email"
                            name="email"
                        />
                        <span className="register__text-error email-input-error"></span>
                    </label>
                    <label className="register__field">
                        <input
                            type="password"
                            id="password-input"
                            required
                            placeholder="Пароль"
                            value={data.password}
                            onChange={handleChange}
                            className="register__text register__text_type_password"
                            name="password"
                            minLength="4"
                        />
                        <span className="register__text-error password-input-error"></span>
                    </label>
                </fieldset>
                <button className="register__save-button" type="submit">
                    Зарегистрироваться
                </button>
                <p className="register__hint">
                    Уже зарегистрированы?{" "}
                    <Link className="register__link" to="/sign-in">
                        Войти
                    </Link>
                </p>
            </form>
        </section>
    );
};

export default Register;