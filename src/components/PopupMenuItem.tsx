import {MenuItem} from "../state/MenuItem.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretRight} from "@fortawesome/free-solid-svg-icons";
import {useRef, useState} from "react";
import PopupMenu from "./PopupMenu.tsx";
import {PopupMenuState} from "../state/PopupMenuState.ts";
import {Position} from "../state/Position.ts";

export default function PopupMenuItem(props: { item: MenuItem }) {

    const [childMenuState, setChildMenuState] = useState<PopupMenuState>({ triggered: false, position: {} });
    const menuItemRef = useRef<HTMLLIElement>(null);
    const childMenuRef = useRef<HTMLUListElement>(null);

    const onMouseEnter = () => {

        if (!props.item.children) {
            return;
        }

        const menuItemBoundingBox = menuItemRef.current!.getBoundingClientRect();

        let position: Position = {
            top: menuItemBoundingBox.top,
            left: menuItemBoundingBox.right,
        };

        const childMenuBoundingBox = childMenuRef.current!.getBoundingClientRect();

        if (position.left! + childMenuBoundingBox.width > window.innerWidth) {
            position = {
                top: menuItemBoundingBox.top,
                right: window.innerWidth - menuItemBoundingBox.left,
            }
        }

        setChildMenuState({ triggered: true, position: position });
    };

    const onMouseLeave = () => {
        setChildMenuState((prevState) => ({ triggered: false, position: prevState.position }));
    }

    return (
        <li className={"popup-menu__item " + (props.item.disabled ? "popup-menu__item--disabled" : "")}
            ref={menuItemRef}
            onClick={props.item.onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}>

            {props.item.title}
            {props.item.children && (
                <>
                    <FontAwesomeIcon style={{ marginLeft: 5 }} icon={faCaretRight}/>
                    <PopupMenu ref={childMenuRef} items={props.item.children} triggered={childMenuState.triggered} position={childMenuState.position!} />
                </>
            )}
        </li>
    )
}