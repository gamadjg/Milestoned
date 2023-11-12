import { LoginRegForm } from "../components/LoginRegForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type User = {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
};

export default function Login() {
    const navigate = useNavigate();

    const handleLogin = async ({ email, password }: User) => {
        console.log("login initiated");
        try {
            const res = await axios.post(
                "http://localhost:8000/api/users/login",
                {
                    email,
                    password,
                }
            );
            console.log("login successful", res.data);
            navigate("/dashboard");
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <main className="flex w-screen h-screen flex-col items-center justify-center gap-9 px-3 md:px-52">
            <p className="text-2xl">Login</p>
            <div className="w-5/6 md:w-3/6">
                <LoginRegForm login handleUser={handleLogin} />
            </div>
        </main>
    );
}
