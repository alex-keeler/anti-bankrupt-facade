import LoginForm from "../components/LoginForm.tsx";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();

    useEffect(() => {
        const loggedIn = localStorage.getItem("Auth-Token") !== null;

        if (loggedIn) {
            navigate("/secure/budget/dashboard");
        }
    });

    return (
        <>
            <LoginForm/>
        </>
    )
}