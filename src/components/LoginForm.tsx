import '../scss/login-form.scss';
import '../scss/button.scss';
import {FormEvent, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {useSetBannerMessage} from "../layouts/LoginLayout.tsx";
import {BannerMessage} from "../state/BannerMessage.ts";

export default function LoginForm() {

    const { setBannerMessage } = useSetBannerMessage();

    const username = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    if (username.current) {
        username.current.value = "";
    }
    if (password.current) {
        password.current.value = "";
    }

    function login(event: FormEvent<HTMLFormElement>) {

        event.preventDefault();

        if (!username.current || !password.current || !username.current.value || !password.current.value) {
            return;
        }

        const formData = new FormData();

        formData.set("username", username.current.value);
        formData.set("password", password.current.value);

        fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Invalid username / password combination");
                }
                return response.text();
            })
            .then(jwt => {
                localStorage.setItem("Auth-Token", jwt);
                navigate("/secure/budget/dashboard");
            })
            .catch(error => {
                setBannerMessage({
                    type: 'error',
                    message: error.message
                } as BannerMessage);
            });
    }

    return (
        <form className={"login-form"} onSubmit={login}>
            <div className="login-form__header">Budget Manager</div>
            <div className="login-form__field">
                <label htmlFor="username"></label>
                <input type="text" className="login-form__input" ref={username} placeholder="Username"/>
            </div>
            <div className="login-form__field">
                <label htmlFor="password"></label>
                <input type="password" className="login-form__input" ref={password} placeholder="Password"/>
            </div>
            <div className="login-form__field login-form__field--submit">
                <input type="submit" className="button" value="Login"/>
            </div>
        </form>
    );
}