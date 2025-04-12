import BudgetTracker from "../components/BudgetTracker.tsx";
import {BudgetClassification} from "../models/enum/BudgetClassification.ts";
import {BudgetState} from "../models/BudgetState.ts";
import {useQuery} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import {Dispatch, SetStateAction, useState} from "react";
import {useDateContext} from "../context/context.ts";

export default function BudgetDashboard() {

    const [classification, setClassification] = useState(BudgetClassification.Wants);

    const navigate = useNavigate();
    const date = useDateContext();

    const { isPending, error, data } = useQuery({
        queryKey: ["budget", "list", date.year, date.month],
        queryFn: () =>
            fetch(`${import.meta.env.VITE_API_URL}/api/secure/budget/state/list?year=${date.year}&month=${date.month}`, {
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
                .then(data => data as BudgetState[])
    });

    if (isPending) {
        return (<>
            <h1>Budget Dashboard</h1>
            Loading...
        </>);
    }

    if (error) {
        console.error(error);
        return (<>
            <h1>Budget Dashboard</h1>
            An error has occurred.
        </>);
    }

    return (
        <>
            <h1>Budget Dashboard</h1>
            <ClassificationSelector classification={classification} setClassification={setClassification}/>
            <BudgetList classification={classification} budgets={data}/>
        </>
    )
}

function ClassificationSelector(props: {classification: BudgetClassification, setClassification: Dispatch<SetStateAction<BudgetClassification>>}) {
    return (
        <div className={"classification-select__container"}>
            <div className={"classification-select"}>
                {[BudgetClassification.Wants, BudgetClassification.Needs, BudgetClassification.Savings, BudgetClassification.Income]
                    .map(classification => {
                        return (
                            <div key={classification}
                                 className={"classification-select__entry " + (classification === props.classification ? "classification-select__entry--selected" : "")}
                                 onClick={() => props.setClassification(classification)}>
                                {BudgetClassification[classification]}
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

function BudgetList(props: {classification: BudgetClassification, budgets: BudgetState[]}) {
    return (
        <div className={"budget__list"}>
            {props.budgets.map(budget => {
                if (budget.classification === props.classification) {
                    return (<BudgetTracker key={budget.id} budget_state={budget}/>);
                }
            })}
        </div>
    )
}