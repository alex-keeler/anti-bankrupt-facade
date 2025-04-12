import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faPenToSquare, faPlus} from "@fortawesome/free-solid-svg-icons";
import {BudgetTransactionMappingDetails} from "../models/BudgetTransactionMappingDetails.ts";
import {useState} from "react";
import {BudgetMappingState} from "../state/BudgetMappingState.ts";
import BudgetMapping from "./BudgetMapping.tsx";
import "../scss/budget-mapping.scss";
import {TransactionDetails} from "../models/TransactionDetails.ts";
import {formatAmount} from "../util/util.ts";
import {useNavigate} from "react-router-dom";

export default function TransactionBudgetMappings(props: { transaction: TransactionDetails, budgetMappings: BudgetTransactionMappingDetails[] }) {

    const [mappingStates, setMappingStates] = useState(fromMappings(props.budgetMappings));
    const [editing, setEditing] = useState(false);
    const navigate = useNavigate();

    const addMapping = () => {
        setMappingStates((mappingStates) => [...mappingStates, { categorizedState: undefined }]);
    }

    const editMappings = () => {
        setEditing(true);
    }

    const saveMappingEdits = () => {
        if (validateBudgetMappingAmounts()) {
            const categorizedStates = mappingStates
                .filter(state => state.categorizedState !== undefined)
                .map(state => state.categorizedState);

            fetch(`${import.meta.env.VITE_API_URL}/api/secure/transaction/${props.transaction.id}/budget-mappings/assign`, {
                method: 'POST',
                headers: {
                    'Auth-Token': localStorage.getItem("Auth-Token")!
                },
                body: JSON.stringify(categorizedStates)
            })
                .then(response => {
                    if (response.status === 401) {
                        navigate("/logout");
                    }

                    setEditing(false);

                    return response.json();
                })
                .then(data => data as BudgetTransactionMappingDetails[])
                .then(mappingDetails => setMappingStates(fromMappings(mappingDetails)));
        }
    }

    const validateBudgetMappingAmounts = (): boolean => {

        let totalMappingAmount = 0;

        mappingStates.forEach(mappingState => {
            if (mappingState.categorizedState) {
                totalMappingAmount += mappingState.categorizedState.amount;
            }
        });

        if (totalMappingAmount === props.transaction.amount) {
            return true;
        }

        alert("Amount mismatch: " + //
                "\ntransaction amount: " + formatAmount(props.transaction.amount) + //
                "\ntotal mapping amount: " + formatAmount(totalMappingAmount));
        return false;
    }

    const changeMappingState = (newState: BudgetMappingState, index: number) => {
        // react requires a new array object to rerender the mapping states :)
        const newMappingStates = [...mappingStates];
        newMappingStates[index] = newState;
        setMappingStates(newMappingStates);
        setEditing(true);
    }

    return (
        <div className={"budget-mapping__container"}>
            <ul className={"budget-mapping__list"}>
                {mappingStates.map((mappingState, index) => {
                    return (<BudgetMapping key={index} state={mappingState} transaction={props.transaction} editing={editing} numberOfMappings={mappingStates.length} setState={newState => changeMappingState(newState, index)} />)
                })}
            </ul>
            <div className={"budget-mapping__actions"}>
                <div className={"budget-mapping__add"} onClick={addMapping}>
                    <FontAwesomeIcon icon={faPlus}/>
                </div>
                {editing ?
                    (
                        <div className={"budget-mapping__save"} onClick={saveMappingEdits}>
                            <FontAwesomeIcon icon={faCheck}/>
                        </div>
                    ) : (
                        <div className={"budget-mapping__edit"} onClick={editMappings}>
                            <FontAwesomeIcon icon={faPenToSquare}/>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

function fromMappings(budgetMappings: BudgetTransactionMappingDetails[]): BudgetMappingState[] {
    if (budgetMappings.length > 0) {
        return budgetMappings.map(budgetMapping => {
            return {
                categorizedState: {
                    id: budgetMapping.id,
                    budget_id: budgetMapping.budget_id,
                    bank_transaction_id: budgetMapping.bank_transaction_id,
                    amount: budgetMapping.amount,
                    budget_title: budgetMapping.budget_title,
                    behavior: budgetMapping.behavior,
                }
            }
        });
    } else {
        return [{ categorizedState: undefined }];
    }
}