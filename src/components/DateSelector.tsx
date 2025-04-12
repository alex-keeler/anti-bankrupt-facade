import '../scss/date-selector.scss';
import {BrowserView, MobileView} from 'react-device-detect';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarAlt} from "@fortawesome/free-solid-svg-icons";
import {Dispatch, SetStateAction, useRef, useState} from "react";
import {DateSelection} from "../state/DateSelection.ts";
import {useDateContext} from "../context/context.ts";

export default function DateSelector(props: {setDate: Dispatch<SetStateAction<DateSelection>>}) {

    const [expanded, setExpanded] = useState<boolean>(false);

    function toggleExpanded() {
        console.log("toggling: ", expanded);
        setExpanded(!expanded);
    }

    return (
        <>
            <BrowserView>
                <Selector setDate={props.setDate}/>
            </BrowserView>
            <MobileView>
                <div className={"date-selector__icon"}>
                    <FontAwesomeIcon icon={faCalendarAlt} onClick={toggleExpanded}/>
                </div>
                <div className={"date-selector__container " + (expanded ? "date-selector__container--shown" : "date-selector__container--hidden")}>
                    <Selector setDate={props.setDate}/>
                </div>
            </MobileView>
        </>
    )
}

function Selector(props: {setDate: Dispatch<SetStateAction<DateSelection>>}) {

    const year = useRef<HTMLSelectElement>(null);
    const month = useRef<HTMLSelectElement>(null);

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    const yearsLength = 5;
    const currentYearIndex = 3;

    function updateDateSelection() {
        props.setDate({
            year: parseInt(year!.current!.value),
            month: parseInt(month!.current!.value),
        });
    }

    const date = useDateContext();

    const years = Array.from(new Array(yearsLength), (_, i) => i + currentYear - currentYearIndex);

    return (
        <div className={"date-selector"}>
            <select className={"date-selector__month"} ref={month} defaultValue={date.month}>
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

            <select className={"date-selector__year"} ref={year} defaultValue={date.year}>
                {years.map(yearValue => {
                    return (<option key={yearValue} value={yearValue}>{yearValue}</option>)
                })}
            </select>
            <button className={"date-selector__confirm"} onClick={updateDateSelection}>Confirm</button>
        </div>
    )
}