import DateSelector from "../components/DateSelector.tsx";
import '../scss/header.scss';
import {useNavigate} from "react-router-dom";
import {DateSelection} from "../state/DateSelection.ts";
import {Dispatch, SetStateAction} from "react";

const user = {
  firstName: 'Alex',
  lastName: 'Keeler',
};

export default function Header(props: {setDate: Dispatch<SetStateAction<DateSelection>>}) {

    const navigate = useNavigate();

    return (
        <div className={"header"}>
            <div className={"header__date-selector"}>
                <DateSelector setDate={props.setDate}/>
            </div>
            <div className={"header__user-actions"}>
                <div className={"header__user-info"}>
                    {user.firstName} {user.lastName}
                </div>
                <button className={"header__logout"} onClick={() => navigate("/logout")}>
                    Logout
                </button>
            </div>
        </div>
    )
}