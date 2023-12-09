import { LoginRegForm } from "../components/LoginRegForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/reducers/userSlice";

type Data = {
    email: string;
    password: string;
};

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async ({ email, password }: Data) => {
        try {
            // console.log(email, password);
            const res = await axios.post(
                "http://localhost:8000/api/users/login",
                {
                    email,
                    password,
                }
            );
            dispatch(loginSuccess(res.data.user));
            sessionStorage.setItem("session_token", res.data.token);
            sessionStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/dashboard");
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <main className="flex flex-col justify-center items-center px-3 md:px-52 mt-20">
            <p className="text-2xl">Login</p>
            <div className="w-5/6 md:max-w-md">
                <LoginRegForm login handleUser={handleLogin} />
            </div>
        </main>
    );
}
