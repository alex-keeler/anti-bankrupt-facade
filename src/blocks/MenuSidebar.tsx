import '../scss/sidebar.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {Link} from "react-router-dom";

export default function MenuSidebar(props: { links: { icon: IconDefinition, name: string, href: string }[] }) {
    return (
        <div className={"sidebar"}>
            <div className={"sidebar__list"}>
                {props.links.map(link => {
                    return (<MenuLink key={link.href} link={link}/>)
                })}
            </div>
        </div>
    )
}

function MenuLink(props: {link: { icon: IconDefinition, name: string, href: string }}) {
    return (
        <Link className={"sidebar__link"} to={props.link.href}>
            <FontAwesomeIcon icon={props.link.icon}/>
            &nbsp;
            <span>{props.link.name}</span>
        </Link>
    )
}