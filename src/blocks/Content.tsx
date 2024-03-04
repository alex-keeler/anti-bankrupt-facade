import '../scss/content.scss';
import {ReactNode} from "react";
import {isMobile} from "react-device-detect";

export default function Content(props: { children: ReactNode[] }) {

    return (
        <div className={"content__container " + (isMobile ? "content__container--mobile" : "content__container--desktop")}>
            <div className={"content"}>
                {props.children}
            </div>
        </div>
    )
}