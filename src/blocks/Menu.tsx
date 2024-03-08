import {BrowserView, MobileView} from "react-device-detect";
import MenuSidebar from "./MenuSidebar.tsx";
import MenuFooter from "./MenuFooter.tsx";
import {faGaugeHigh, faMoneyBills, faPiggyBank, faUpload, faWallet} from "@fortawesome/free-solid-svg-icons";

export default function Menu() {

    const menuLinks = [
        {
            icon: faGaugeHigh,
            name: "Dashboard",
            href: "/secure/user/dashboard"
        },{
            icon: faUpload,
            name: "Upload Bank Records",
            href: "/secure/bank-record/upload"
        },{
            icon: faMoneyBills,
            name: "Cash Flow Dashboard",
            href: "/secure/cash-flow/dashboard"
        },{
            icon: faWallet,
            name: "Transactions",
            href: "/secure/transaction/dashboard"
        },{
            icon: faPiggyBank,
            name: "Budgets",
            href: "/secure/budget/dashboard"
        },
    ];

    return (
        <>
            <BrowserView>
                <MenuSidebar links={menuLinks}/>
            </BrowserView>
            <MobileView>
                <MenuFooter links={menuLinks}/>
            </MobileView>
        </>
    )
}