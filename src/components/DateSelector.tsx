import '../scss/date-selector.scss';
import {BrowserView, MobileView} from 'react-device-detect';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarAlt} from "@fortawesome/free-solid-svg-icons";
import React from "react";

export default function DateSelector() {

    const [expanded, setExpanded] = React.useState(false);

    function toggleExpanded() {
        console.log("toggling: ", expanded);
        setExpanded(!expanded);
    }

    return (
        <>
            <BrowserView>
                <Selector/>
            </BrowserView>
            <MobileView>
                <div className={"date-selector__icon"}>
                    <FontAwesomeIcon icon={faCalendarAlt} onClick={toggleExpanded}/>
                </div>
                <div className={"date-selector__container " + (expanded ? "date-selector__container--shown" : "date-selector__container--hidden")}>
                    <Selector/>
                </div>
            </MobileView>
        </>
    )
}

function Selector() {
    return (
        <div className={"date-selector"}>
            <select className={"date-selector__month"}>
                <option value={1}>January</option>
                <option value={2}>February</option>
                <option value={3}>March</option>
                <option value={4}>April</option>
                <option value={5}>May</option>
                <option value={6}>June</option>
                <option value={7}>July</option>
                <option value={8}>August</option>
                <option value={9}>September</option>
                <option value={10}>October</option>
                <option value={11}>November</option>
                <option value={12}>December</option>
            </select>

            <select className={"date-selector__year"}>
                <option value={2021}>2021</option>
                <option value={2022}>2022</option>
                <option value={2023}>2023</option>
                <option value={2024}>2024</option>
                <option value={2025}>2025</option>
            </select>
            <button className={"date-selector__confirm"}>Confirm</button>
        </div>
    )
}