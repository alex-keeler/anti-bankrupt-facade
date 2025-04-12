import Menu from "../blocks/Menu.tsx";
import Content from "../blocks/Content.tsx";
import Header from "../blocks/Header.tsx";
import {Outlet} from "react-router-dom";
import LoggedIn from "../components/LoggedIn.tsx";
import {Dispatch, SetStateAction} from "react";
import {DateSelection} from "../state/DateSelection.ts";

export default function SecureLayout(props: {setDate: Dispatch<SetStateAction<DateSelection>>}) {

    return (
        <>
            <LoggedIn>
                <Menu/>
                <Content>
                    <Outlet/>
                </Content>
                {/* TODO: figure out how to put header's date selector on top without having to move the header to the bottom like this */}
                <Header setDate={props.setDate}/>
            </LoggedIn>
        </>
    )
}