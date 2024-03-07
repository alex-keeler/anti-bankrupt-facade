import '../scss/footer.scss';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function MenuFooter(props: { links: { icon: IconDefinition, href: string }[] }) {
    return (
        <div className={"footer"}>
            <div className={"footer__list"}>
                {props.links.map(link => {
                    return (<MenuLink link={link}/>)
                })}

                {/*<MenuLink icon={faGaugeHigh} href={"/secure/dashboard"}/>*/}
                {/*<MenuLink icon={faUpload} href={"/secure/upload/bank-record"}/>*/}
                {/*<MenuLink icon={faMoneyBills} href={"/secure/cash-flow/dashboard"}/>*/}
                {/*<MenuLink icon={faWallet} href={"/secure/transaction/dashboard"}/>*/}
                {/*<MenuLink icon={faPiggyBank} href={"/secure/budget/dashboard"}/>*/}
            </div>
        </div>
    )
}

function MenuLink(props: { link: { icon: IconDefinition, href: string }}) {
    return (
        <a className={"footer__link"} href={props.link.href}>
            <FontAwesomeIcon icon={props.link.icon}/>
        </a>
    )
}