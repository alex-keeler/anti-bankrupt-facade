import "../scss/form.scss";
import {useQuery} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import {BankAccount} from "../models/BankAccount.ts";
import {FormEvent, useRef} from "react";
import {BudgetTransactionMappingDetails} from "../models/BudgetTransactionMappingDetails.ts";

export default function BankRecordUploadForm() {

    const navigate = useNavigate();
    const bankAccountIdRef = useRef<HTMLSelectElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const { isPending, error, data } = useQuery({
        queryKey: ["bank-account", "editable", "list"],
        queryFn: () =>
            fetch(`${import.meta.env.VITE_API_URL}/api/secure/bank-account/editable/list`, {
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
                .then(data => data as BankAccount[])
    });

    const submitForm = (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const data = new FormData();

        data.append("bank_account_id", bankAccountIdRef.current!.value);
        data.append("file", fileRef.current!.files![0]);


        fetch(`${import.meta.env.VITE_API_URL}/api/secure/bank-record/upload`, {
            method: 'POST',
            headers: {
                'Auth-Token': localStorage.getItem("Auth-Token")!,
            },
            body: data
        })
            .then(response => {
                if (response.status === 401) {
                    navigate("/logout");
                } else if (response.status === 200) {
                    navigate("/secure/transaction/dashboard")
                } else {
                    alert("An error has occurred");
                    console.error(response);
                }
            });
    };

    if (isPending) {
        return (<div>Loading...</div>);
    }

    if (error) {
        console.error(error);
        return (<div>An error has occurred.</div>);
    }

    return (
        <form className={"form"} onSubmit={submitForm}>
            <fieldset>
                <select name={"bank_account_id"} ref={bankAccountIdRef} required={true}>
                    <option>Select a Bank Account</option>
                    { data.map((bankAccount: BankAccount) => {
                        return (<option key={bankAccount.id} value={bankAccount.id!}>{bankAccount.title}</option>);
                    })}
                </select>
            </fieldset>
            <fieldset>
                <input name={"file"} type={"file"} ref={fileRef} required={true}/>
            </fieldset>
            <fieldset>
                <input type={"submit"} value={"Upload"}/>
            </fieldset>
        </form>
    );
}