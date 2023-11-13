// import { useSelector, useDispatch } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../store/reducers/userSlice";
// import { RootState } from "../store/store";
import { Link, useNavigate } from "react-router-dom";
// import axios, { AxiosRequestConfig } from "axios";

const Header = () => {
    const navigate = useNavigate();
    // const isAuthenticated = useSelector(
    //     (state: RootState) => state.user.isAuthenticated
    // );
    const dispatch = useDispatch();
    // const sessionToken = props.authenticated
    const sessionToken = sessionStorage.getItem("session_token")
        ? sessionStorage.getItem("session_token")
        : null;

    const handleLogout = () => {
        sessionStorage.clear();
        dispatch(logout());
        navigate("/");
    };

    return (
        <header className="flex z-10 justify-between items-center shadow-md w-full bg-white px-10 sticky top-0 bottom-0">
            <Link to={"/"} className="font-bold text-2xl p-4">
                Milestoned
            </Link>
            <div className="text-blue-400 p-4">
                {sessionToken ? (
                    <>
                        <Link to={"/dashboard"} className="mr-4 cursor-pointer">
                            Profile
                        </Link>
                        <span onClick={handleLogout} className="cursor-pointer">
                            Logout
                        </span>
                    </>
                ) : (
                    <>
                        <Link to={"/login"} className="mr-4 cursor-pointer">
                            Login
                        </Link>
                        <Link to={"/register"} className="cursor-pointer">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
