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
                "http://localhost:8000/api/users/register",
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
            // setErrors(error);
        }
    };

    return (
        <main className="flex w-full h-full flex-col items-center justify-center gap-9 px-3 md:px-52">
            {/* // <main className="w-full h-full grid items-center justify-center gap-9 px-3 md:px-52"> */}
            <p className="text-2xl">Register</p>
            <div className="w-5/6 md:w-3/6">
                <LoginRegForm register handleUser={handleRegister} />
            </div>
        </main>
    );
}
