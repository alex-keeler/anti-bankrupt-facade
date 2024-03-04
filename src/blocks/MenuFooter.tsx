import '../scss/footer.scss';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGaugeHigh, faMoneyBills, faPiggyBank, faUpload, faWallet} from "@fortawesome/free-solid-svg-icons";

export default function MenuFooter() {
    return (
        <div className={"footer"}>
            <div className={"footer__list"}>
                <MenuLink icon={faGaugeHigh} href={"/secure/dashboard"}/>
                <MenuLink icon={faUpload} href={"/secure/upload/bank-record"}/>
                <MenuLink icon={faMoneyBills} href={"/secure/cash-flow/dashboard"}/>
                <MenuLink icon={faWallet} href={"/secure/transaction/dashboard"}/>
                <MenuLink icon={faPiggyBank} href={"/secure/budget/dashboard"}/>
            </div>
        </div>
    )
}

function MenuLink(props: { icon: IconDefinition, href: string }) {
    return (
        <a className={"footer__link"} href={props.href}>
            <FontAwesomeIcon icon={props.icon}/>
        </a>
    )
}