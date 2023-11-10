import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { loginUser, registerUser } from "@/app/api/users/handleUser";

type props = {
    login?: boolean;
    register?: boolean;
};

export const LoginRegForm = ({ login, register }: props) => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [errors, setErrors] = useState([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (login) {
            console.log("login initiated");
            // try {
            // const res = await loginUser({ email, password });
            // if (res.length >= 1) {
            //     console.error("Login error:", res);
            //     setErrors(res);
            // }
            console.log("login successful");
            navigate("/dashboard");
            // } catch (error: any) {
            // console.error("Login error:", error);
            // setErrors(error);
            // }
        } else {
            console.log("registration initiated");
            // const res = await registerUser({
            //     firstName,
            //     lastName,
            //     email,
            //     password,
            // });
            // console.log(res);
            navigate("/dashboard");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {register ? (
                <>
                    <div className="relative">
                        <input
                            type="firstname"
                            placeholder="First Name"
                            className="mb-5 block w-full rounded-md border border-navy-100 px-10 py-2 focus:border-slate-200 focus:outline-none"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="relative">
                        <input
                            type="lastname"
                            placeholder="Last Name"
                            className="mb-5 block w-full rounded-md border border-navy-100 px-10 py-2 focus:border-slate-200 focus:outline-none"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                </>
            ) : (
                <></>
            )}
            <div className="relative">
                <input
                    type="email"
                    placeholder="Email Address"
                    className="mb-5 block w-full rounded-md border border-navy-100 px-10 py-2 focus:border-slate-200 focus:outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="relative">
                <input
                    type="password"
                    placeholder="Password"
                    className="block w-full rounded-md border border-navy-100 px-10 py-2 focus:border-slate-200 focus:outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                {login ? (
                    <>
                        <button
                            type="submit"
                            className="rounded-lg bg-[#334155] text-white mt-10 px-16 py-2 text-center w-full"
                        >
                            LOGIN
                        </button>
                        <p className="my-8 text-center text-sm text-navy-200 md:text-base">
                            Don't have an account?{" "}
                            <Link
                                to={"/users/register"}
                                className="cursor-pointer font-semibold text-blue-700 hover:underline"
                            >
                                Register here!
                            </Link>
                        </p>
                    </>
                ) : (
                    <>
                        <button
                            type="submit"
                            className="rounded-lg bg-[#334155] text-white mt-10 px-16 py-2 text-center w-full"
                        >
                            REGISTER
                        </button>
                        <p className="my-8 text-center text-sm text-navy-200 md:text-base">
                            Already have an account?{" "}
                            <Link
                                to={"/users/login"}
                                className="cursor-pointer font-semibold text-blue-700 hover:underline"
                            >
                                Login here!
                            </Link>
                        </p>
                    </>
                )}
            </div>
        </form>
    );
};

// export default UserForm;
