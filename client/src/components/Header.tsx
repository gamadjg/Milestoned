import { useDispatch } from "react-redux";
import { logout } from "../store/reducers/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sessionToken = sessionStorage.getItem("session_token")
        ? sessionStorage.getItem("session_token")
        : null;

    const handleLogout = () => {
        sessionStorage.clear();
        dispatch(logout());
        navigate("/");
    };

    return (
        <header className="flex z-10 justify-between items-center shadow-md w-full bg-white md:px-10 px-2 sticky top-0 bottom-0">
            <Link to={"/"} className="font-medium text-2xl p-4">
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
