import {useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {useDateContext} from "../context/context.ts";
import {BudgetsByClassification} from "../models/BudgetsByClassification.ts";
import "../scss/budget-mapping.scss";
import "../scss/popup-menu.scss";
import {MenuItem} from "../state/MenuItem.ts";
import PopupMenu from "./PopupMenu.tsx";
import {Position} from "../state/Position.ts";
import {Budget} from "../models/Budget.ts";

export default function BudgetSelectMenu(props: { triggered: boolean, position: Position, onSelection: (budget: Budget) => void }) {

    const date = useDateContext();
    const navigate = useNavigate();

    const { isPending, error, data } = useQuery({
        queryKey: ["budgets", "group-by-classification", "list", date.year, date.month],
        queryFn: () =>
            fetch(`${import.meta.env.VITE_API_URL}/api/secure/budgets/group-by-classification/list?year=${date.year}&month=${date.month}`, {
                method: 'GET',
                headers: {
                    'Auth-Token': localStorage.getItem("Auth-Token")!
                },
            })
                .then(response => {
                    if (response.status === 401) {
                        navigate("/logout");
                    }

                    return response.json();
                })
                .then(data => data as BudgetsByClassification[])
    });

    const menuItems: MenuItem[] = [];

    if (isPending) {
        menuItems.push({
            title: "Loading...",
            disabled: true,
        })
    } else if (error) {
        menuItems.push({
            title: "An error has occurred.",
            disabled: true,
        })
    } else {
        data.forEach(entry => {

            const submenuItems: MenuItem[] = [];

            entry.budgets.forEach(budget => {
                submenuItems.push({
                    title: budget.title,
                    onClick: () => {
                        props.onSelection(budget);
                    }
                })
            });

            menuItems.push({
                title: entry.classification,
                children: submenuItems,
            });
        });
    }

    return (<PopupMenu items={menuItems} position={props.position} triggered={props.triggered} />);
}