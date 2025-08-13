import '../scss/footer.scss';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function MenuFooter(props: { links: { icon: IconDefinition, href: string }[] }) {
    return (
        <div className={"footer"}>
            <div className={"footer__list"}>
                {props.links.map(link => {
                    return (<MenuLink key={link.href} link={link}/>)
                })}
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