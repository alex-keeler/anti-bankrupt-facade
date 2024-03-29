import '../scss/login-form.scss';

export default function LoginForm() {
    return (
        <form className={"login-form"} method={"POST"}>
            <div className="login-form__header">Budget Manager</div>
            <div className="login-form__field">
                <label htmlFor="username"></label>
                <input type="text" className="login-form__input" name="username" placeholder="Username"/>
            </div>
            <div className="login-form__field">
                <label htmlFor="password"></label>
                <input type="password" className="login-form__input" name="password" placeholder="Password"/>
            </div>
            <div className="login-form__field login-form__field--submit">
                <input type="submit" className="button" value="Login"/>
            </div>
        </form>
    );
}