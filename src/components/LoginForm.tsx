import '../scss/login-form.scss';
import {useRef, useState} from "react";
import {redirect} from "react-router-dom";

export default function LoginForm() {

    const username = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    function login() {

        alert('login');

        if (!username.current || !password.current || !username.current!.value || !password.current!.value) {
            alert('sad :(')
            return false;
        }

        alert(import.meta.env.VITE_API_URL + '/api/login');
        fetch(import.meta.env.VITE_API_URL + '/api/login')
            .then(response => response.text())
            .then(jwt => {
                alert('testy test');
                localStorage.setItem("Auth-Token", jwt);
                setLoggedIn(true);
            })
            .catch(error => alert('error: ' + error));
    }

    if (loggedIn) {
        return redirect("/secure/user/dashboard");
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