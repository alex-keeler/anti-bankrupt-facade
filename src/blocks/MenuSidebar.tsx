import '../scss/sidebar.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";

export default function MenuSidebar(props: { links: { icon: IconDefinition, name: string, href: string }[] }) {
    return (
        <div className={"sidebar"}>
            <div className={"sidebar__list"}>
                {props.links.map(link => {
                    return (<MenuLink link={link}/>)
                })}
                {/*<MenuLink icon={faGaugeHigh} name={"Dashboard"} href={"/secure/dashboard"}/>*/}
                {/*<MenuLink icon={faUpload} name={"Upload Bank Records"} href={"/secure/upload/bank-record"}/>*/}
                {/*<MenuLink icon={faMoneyBills} name={"Cash Flow Dashboard"} href={"/secure/cash-flow/dashboard"}/>*/}
                {/*<MenuLink icon={faWallet} name={"Transactions"} href={"/secure/transaction/dashboard"}/>*/}
                {/*<MenuLink icon={faPiggyBank} name={"Budgets"} href={"/secure/budget/dashboard"}/>*/}
            </div>
        </div>
    )
}

function MenuLink(props: {link: { icon: IconDefinition, name: string, href: string }}) {
    return (
        <a className={"sidebar__link"} href={props.link.href}>
            <FontAwesomeIcon icon={props.link.icon}/>
            &nbsp;
            <span>{props.link.name}</span>
        </a>
    )
}