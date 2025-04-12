import {useQuery} from "@tanstack/react-query";
import {FullTransactionDetails} from "../models/FullTransactionDetails.ts";
import {useDateContext} from "../context/context.ts";
import {useNavigate} from "react-router-dom";
import Transaction from "../components/Transaction.tsx";

export default function TransactionDashboard() {

    const date = useDateContext();
    const navigate = useNavigate();

    const { isPending, error, data } = useQuery({
        queryKey: ["transaction", "list", date.year, date.month],
        queryFn: () =>
            fetch(`${import.meta.env.VITE_API_URL}/api/secure/transaction/list?year=${date.year}&month=${date.month}`, {
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
                .then(data => data as FullTransactionDetails[])
    });

    if (isPending) {
        return (
            <>
                <h1>Transaction Dashboard</h1>
                Loading...
            </>
        )
    }

    if (error) {
        return (
            <>
                <h1>Transaction Dashboard</h1>
                An error has occurred.
            </>
        )
    }

    console.log(data);

    return (
        <>
            <h1>Transaction Dashboard</h1>
            {data.length > 0 ?
                (<TransactionList fullTransactionDetailsList={data}/>) :
                (<div style={{fontStyle: "italic"}}>No transactions found for this month.</div>)}
        </>
    );
}

function TransactionList(props: {fullTransactionDetailsList: FullTransactionDetails[]}) {
    return (
        <ul className={"transaction__list"}>
            {props.fullTransactionDetailsList.map(fullTransactionDetails => {
                return (<Transaction key={fullTransactionDetails.transaction.id} fullTransactionDetails={fullTransactionDetails}/>);
            })}
        </ul>
    );
}