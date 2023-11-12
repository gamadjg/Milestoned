import { LoginRegForm } from "../components/LoginRegForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type User = {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
};

export default function Register() {
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
            navigate("/dashboard");
        } catch (error) {
            console.error("registration error:", error);
            // setErrors(error);
        }
    };

    return (
        <main className="flex w-screen h-screen flex-col items-center justify-center gap-9 px-3 md:px-52">
            <p className="text-2xl">Register here to create an account!</p>
            <div className="w-5/6 md:w-3/6">
                <LoginRegForm register handleUser={handleRegister} />
            </div>
        </main>
    );
}
