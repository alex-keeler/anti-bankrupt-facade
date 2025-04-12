import {Routes, Route, BrowserRouter} from "react-router-dom";
import Home from "./pages/Home.tsx";
import SecureLayout from "./layouts/SecureLayout.tsx";
import UserDashboard from "./pages/UserDashboard.tsx";
import TransactionDashboard from "./pages/TransactionDashboard.tsx";
import BudgetDashboard from "./pages/BudgetDashboard.tsx";
import CashFlowDashboard from "./pages/CashFlowDashboard.tsx";
import BankRecordUpload from "./pages/BankRecordUpload.tsx";
import Login from "./pages/Login.tsx";
import LoginLayout from "./layouts/LoginLayout.tsx";
import Logout from "./pages/Logout.tsx";
import {DateSelection} from "./state/DateSelection.ts";
import {DateContext} from "./context/context.ts";
import {useState} from "react";

function App() {

    const [date, setDate] = useState(getDateSelection());

    saveDateSelection(date);

    return (
        <>
            <DateContext.Provider value={date}>
                <BrowserRouter>
                    <Routes>
                        <Route path={"/"} element={<Home/>}/>
                        <Route path={"/secure"} element={<SecureLayout setDate={setDate}/>}>
                            <Route path={"user/dashboard"} element={<UserDashboard/>}/>
                            <Route path={"budget/dashboard"} element={<BudgetDashboard/>}/>
                            <Route path={"transaction/dashboard"} element={<TransactionDashboard/>}/>
                            <Route path={"cash-flow/dashboard"} element={<CashFlowDashboard/>}/>
                            <Route path={"bank-record/upload"} element={<BankRecordUpload/>}/>
                        </Route>
                        <Route element={<LoginLayout/>}>
                            <Route path={"/login"} element={<Login/>}/>
                            <Route path={"/logout"} element={<Logout/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </DateContext.Provider>
        </>
    );
}

function saveDateSelection(dateSelection: DateSelection) {
    sessionStorage.setItem("year", dateSelection.year.toString());
    sessionStorage.setItem("month", dateSelection.month.toString());
}

function getDateSelection(): DateSelection {
    if (sessionStorage.getItem("year") && sessionStorage.getItem("month")) {
        return {
            year: parseInt(sessionStorage.getItem("year")!),
            month: parseInt(sessionStorage.getItem("month")!),
        }
    } else {
        const currentDate = new Date();
        return {
            year: currentDate.getFullYear(),
            month: currentDate.getMonth() + 1,
        }
    }
}

export default App
