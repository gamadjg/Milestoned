import { LoginRegForm } from "../components/LoginRegForm";

export default function Register() {
    return (
        <main className="flex w-screen h-screen flex-col items-center justify-center gap-9 px-3 md:px-52">
            <p className="text-2xl">Register here to create an account!</p>
            <div className="w-5/6 md:w-3/6">
                <LoginRegForm register />
            </div>
        </main>
    );
}
