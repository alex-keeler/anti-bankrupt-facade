import {MenuItem} from "../state/MenuItem.ts";
import PopupMenuItem from "./PopupMenuItem.tsx";
import {forwardRef, Ref, useRef, useState} from "react";
import {Position} from "../state/Position.ts";

const PopupMenu = forwardRef(function PopupMenu(props: { items: MenuItem[], triggered: boolean, position: Position }, ref: Ref<HTMLUListElement>) {

    const hovered = useRef(false);
    const [show, setShow] = useState(props.triggered);

    if (props.triggered && !show) {
        setShow(true);
    } else if (!props.triggered && show) {
        setTimeout(() => {
            if (!hovered.current) {
                setShow(false);
            }
        }, 100);
    }

    return (
        <ul ref={ref} className={"popup-menu"} style={{ ...props.position, visibility: show ? "visible" : "hidden" }}
            onMouseEnter={() => { hovered.current = true; }}
            onMouseLeave={()  => { hovered.current = false; setShow(false); }}>
            {props.items.map((item, index) => (
                <PopupMenuItem key={index} item={item} />
            ))}
        </ul>
    )
});

export default PopupMenu;