import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Landing from "./views/Landing";
import Login from "./views/Login";
import Register from "./views/Register";
import Dashboard from "./views/Dashboard";
import Edit from "./views/Edit";
import "./assets/index.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store/rootReducer";

export default function App() {
    const dispatch = useDispatch();
    const sessionUser = sessionStorage.getItem("user")
        ? sessionStorage.getItem("user")
        : null;
    let user = useSelector((state: RootState) => state.user?.user);
    if (!user && sessionUser) {
        console.log("user in session, not in redux");
        user = JSON.parse(sessionUser);
        console.log(user);
        dispatch({ type: "user/setUser", payload: user });
    }

    return (
        <div className="flex flex-col h-screen bg-gray-200">
            <Header />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/edit" element={<Edit />} />
            </Routes>
        </div>
    );
}
