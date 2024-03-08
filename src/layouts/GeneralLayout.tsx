import Menu from "../blocks/Menu.tsx";
import Content from "../blocks/Content.tsx";
import Header from "../blocks/Header.tsx";
import {Outlet} from "react-router-dom";

export default function GeneralLayout() {
    return (
        <>
            <Menu/>
            <Content>
                <Outlet/>
            </Content>
            {/* TODO: figure out how to put header's date selector on top without having to move the header to the bottom like this */}
            <Header/>
        </>
    )
}