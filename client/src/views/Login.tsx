import { LoginRegForm } from "../components/LoginRegForm";

export default function Login() {
    return (
        <main className="flex w-screen h-screen flex-col items-center justify-center gap-9 px-3 md:px-52">
            <p className="text-2xl">Login</p>
            <div className="w-5/6 md:w-3/6">
                <LoginRegForm login />
            </div>
        </main>
    );
}
