import '../scss/sidebar.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGaugeHigh, faUpload, faMoneyBills, faWallet, faPiggyBank} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";

export default function MenuSidebar() {
    return (
        <div className={"sidebar"}>
            <div className={"sidebar__list"}>
                <MenuLink icon={faGaugeHigh} name={"Dashboard"} href={"/secure/dashboard"}/>
                <MenuLink icon={faUpload} name={"Upload Bank Records"} href={"/secure/upload/bank-record"}/>
                <MenuLink icon={faMoneyBills} name={"Cash Flow Dashboard"} href={"/secure/cash-flow/dashboard"}/>
                <MenuLink icon={faWallet} name={"Transactions"} href={"/secure/transaction/dashboard"}/>
                <MenuLink icon={faPiggyBank} name={"Budgets"} href={"/secure/budget/dashboard"}/>
            </div>
        </div>
    )
}

function MenuLink(props: { icon: IconDefinition, name: string, href: string }) {
    return (
        <a className={"sidebar__link"} href={props.href}>
            <FontAwesomeIcon icon={props.icon}/>
            &nbsp;
            <span>{props.name}</span>
        </a>
    )
}