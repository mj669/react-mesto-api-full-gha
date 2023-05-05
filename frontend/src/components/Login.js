import React from "react";

const Login = (props) => {
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
        props.onLogin(data.password, data.email);
    };

    return (
        <section className="login">
            <h2 className="login__title">Вход</h2>
            <form className="login__form" onSubmit={handleSubmit}>
                <fieldset className="login__inputs">
                    <label className="login__field">
                        <input
                            type="email"
                            id="email-input"
                            required
                            placeholder="Email"
                            value={data.email}
                            onChange={handleChange}
                            className="login__text login__text_type_email"
                            name="email"
                        />
                        <span className="login__text-error email-input-error"></span>
                    </label>
                    <label className="login__field">
                        <input
                            type="password"
                            id="password-input"
                            required
                            placeholder="Пароль"
                            value={data.password}
                            onChange={handleChange}
                            className="login__text login__text_type_password"
                            name="password"
                            minLength="4"
                        />
                        <span className="login__text-error password-input-error"></span>
                    </label>
                </fieldset>
                <button className="login__save-button" type="submit">
                    Войти
                </button>
            </form>
        </section>
    );
};

export default Login;