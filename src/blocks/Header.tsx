import DateSelector from "../components/DateSelector.tsx";
import '../scss/header.scss';

const user = {
  firstName: 'Alex',
  lastName: 'Keeler',
};

export default function Header() {
    return (
        <div className={"header"}>
            <div className={"header__date-selector"}>
                <DateSelector/>
            </div>
            <div className={"header__user-actions"}>
                <div className={"header__user-info"}>
                    {user.firstName} {user.lastName}
                </div>
                <button className={"header__logout"}>
                    Logout
                </button>
            </div>
        </div>
    )
}