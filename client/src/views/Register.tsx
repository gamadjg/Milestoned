import { LoginRegForm } from "../components/LoginRegForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/reducers/userSlice";

type User = {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
};

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleRegister = async ({
        email,
        password,
        firstName,
        lastName,
    }: User) => {
        console.log("registration initiated");
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_APP_API_HOST}/api/users/register`,
                {
                    firstName,
                    lastName,
                    email,
                    password,
                }
            );
            console.log("registration successful", res.data);
            dispatch(loginSuccess(res.data.user));
            sessionStorage.setItem("session_token", res.data.token);
            sessionStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/dashboard");
        } catch (error) {
            console.error("registration error:", error);
        }
    };

    return (
        <main className="flex flex-col justify-center items-center px-3 md:px-52 mt-20">
            <p className="text-2xl">Register</p>
            <div className="w-5/6 md:max-w-md">
                <LoginRegForm register handleUser={handleRegister} />
            </div>
        </main>
    );
}
