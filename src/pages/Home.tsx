import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function Home() {

    const navigate = useNavigate();

    useEffect(() => {

        const loggedIn = localStorage.getItem("Auth-Token") !== null;

        if (loggedIn) {
            navigate("/secure/budget/dashboard");
        } else {
            navigate("/login");
        }
    });

    return (<div style={{display: "none"}}>Home</div>);
}