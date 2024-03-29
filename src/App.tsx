import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import GeneralLayout from "./layouts/GeneralLayout.tsx";
import UserDashboard from "./pages/UserDashboard.tsx";
import TransactionDashboard from "./pages/TransactionDashboard.tsx";
import BudgetDashboard from "./pages/BudgetDashboard.tsx";
import CashFlowDashboard from "./pages/CashFlowDashboard.tsx";
import BankRecordUpload from "./pages/BankRecordUpload.tsx";
import Login from "./pages/Login.tsx";

function App() {
    return (
        <>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/secure"} element={<GeneralLayout/>}>
                    <Route path={"user/dashboard"} element={<UserDashboard/>}/>
                    <Route path={"budget/dashboard"} element={<BudgetDashboard/>}/>
                    <Route path={"transaction/dashboard"} element={<TransactionDashboard/>}/>
                    <Route path={"cash-flow/dashboard"} element={<CashFlowDashboard/>}/>
                    <Route path={"bank-record/upload"} element={<BankRecordUpload/>}/>
                </Route>
                <Route path={"/login"} element={<Login/>}/>
            </Routes>
        </>
    );
}

export default App
