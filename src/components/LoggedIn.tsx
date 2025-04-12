import {useNavigate} from "react-router-dom";
import {ReactElement, useEffect} from "react";

export default function LoggedIn(props: { children: ReactElement | ReactElement[] }) {

    const navigate = useNavigate();

    const loggedIn = localStorage.getItem("Auth-Token") !== null;

    useEffect(() => {
        if (!loggedIn) {
            navigate("/login");
        }
    });

    // perhaps this a little overkill, but I'm paranoid about the content rendering before the useEffect() is fired
    if (loggedIn) {
        return (<>{props.children}</>);
    } else {
        return (<></>);
    }
}