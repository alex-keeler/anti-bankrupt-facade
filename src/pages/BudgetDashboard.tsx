import BudgetTracker from "../components/BudgetTracker.tsx";
import {BudgetClassification} from "../models/enum/budget_classification.ts";
import {SpendingType} from "../models/enum/spending_type.ts";
//import {useState} from "react";
//import {useQuery} from "@tanstack/react-query";

export default function BudgetDashboard() {

    const budget: BudgetState = {
        amount_contributed: 20000,
        amount_contributed_this_month: 0,
        amount_current: 30000,
        amount_monthly: 0,
        amount_spent: 10000,
        amount_spent_this_month: 0,
        amount_total: 40000,
        classification: BudgetClassification.Internal,
        cycle_start_date: new Date(),
        id: 0,
        months_until_maturity: undefined,
        spending_type: SpendingType.Variable,
        title: "Test Budget"
    }

    // const [classification, setClassification] = useState(BudgetClassification.Wants);
    //
    // const budgetsQuery = useQuery({
    //     queryKey: [""]
    // });

    return (
        <>
            <h1>Budget Dashboard</h1>
            <div className={"budget__list"}>
                <BudgetTracker budget_state={budget}/>
            </div>
        </>
    )
}