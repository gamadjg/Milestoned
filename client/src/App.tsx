import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Landing from "./views/Landing";
import Login from "./views/Login";
import Register from "./views/Register";
import Dashboard from "./views/Dashboard";
import Edit from "./views/Edit";
import "./assets/index.css";

export default function App() {
    return (
        <div className="flex flex-col h-screen bg-gray-200">
            <Header />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/edit/:_id" element={<Edit />} />
            </Routes>
        </div>
    );
}
