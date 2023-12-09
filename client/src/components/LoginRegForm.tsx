import { Link } from "react-router-dom";
import { Input } from "./Input";
import { useForm, FormProvider } from "react-hook-form";
import {
    firstName_validation,
    lastName_validation,
    password_validation,
    email_validation,
} from "../lib/userValidations";
import { Button } from "./Button";

type props = {
    login?: boolean;
    register?: boolean;
    handleUser: (data: {
        email: string;
        password: string;
        firstName?: string;
        lastName?: string;
    }) => void;
};

export const LoginRegForm = ({ login, register, handleUser }: props) => {
    const methods = useForm();
    const onSubmit = methods.handleSubmit((data) => {
        if (login) {
            handleUser({ email: data.email, password: data.password });
        } else {
            handleUser({
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
            });
        }
    });

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={(e) => e.preventDefault()}
                noValidate
                autoComplete="off"
                className="container"
            >
                {register ? (
                    <>
                        <Input {...firstName_validation} />
                        <Input {...lastName_validation} />
                        <Input {...password_validation} />
                        <Input {...email_validation} />
                    </>
                ) : (
                    <>
                        <Input {...email_validation} />
                        <Input {...password_validation} />
                    </>
                )}
                {register ? (
                    <>
                        <Button
                            text="REGISTER"
                            className="rounded-2xl bg-[#334155] text-white mt-10 px-16 py-2 text-center w-full"
                            onClick={onSubmit}
                        />
                        <p className="my-4 text-center text-sm text-navy-200 md:text-base">
                            Already have an account?{" "}
                            <Link
                                to={"/login"}
                                className="cursor-pointer font-semibold text-blue-700 hover:underline"
                            >
                                Login here!
                            </Link>
                        </p>
                    </>
                ) : (
                    <>
                        <Button
                            text="LOGIN"
                            className="rounded-2xl bg-[#334155] text-white mt-10 px-16 py-2 text-center w-full"
                            onClick={onSubmit}
                        />

                        <p className="my-4 text-center text-sm text-navy-200 md:text-base">
                            Don't have an account?{" "}
                            <Link
                                to={"/register"}
                                className="cursor-pointer font-semibold text-blue-700 hover:underline"
                            >
                                Register here!
                            </Link>
                        </p>
                    </>
                )}
            </form>
        </FormProvider>
    );
};

// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// type props = {
//     login?: boolean;
//     register?: boolean;
//     handleUser: (user: {
//         email: string;
//         password: string;
//         firstName?: string;
//         lastName?: string;
//     }) => void;
// };

// export const LoginRegForm = ({ login, register, handleUser }: props) => {
//     const [firstName, setFirstName] = useState("");
//     const [lastName, setLastName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     // const [errors, setErrors] = useState([]);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         if (login) {
//             handleUser({ email, password });
//         } else {
//             handleUser({ email, password, firstName, lastName });
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             {register ? (
//                 <>
//                     <div className="relative">
//                         <input
//                             type="firstname"
//                             placeholder="First Name"
//                             className="mb-5 block w-full rounded-md border border-navy-100 px-10 py-2 focus:border-slate-200 focus:outline-none"
//                             value={firstName}
//                             onChange={(e) => setFirstName(e.target.value)}
//                             required
//                         />
//                     </div>

//                     <div className="relative">
//                         <input
//                             type="lastname"
//                             placeholder="Last Name"
//                             className="mb-5 block w-full rounded-md border border-navy-100 px-10 py-2 focus:border-slate-200 focus:outline-none"
//                             value={lastName}
//                             onChange={(e) => setLastName(e.target.value)}
//                             required
//                         />
//                     </div>
//                 </>
//             ) : (
//                 <></>
//             )}
//             <div className="relative">
//                 <input
//                     type="email"
//                     placeholder="Email Address"
//                     className="mb-5 block w-full rounded-md border border-navy-100 px-10 py-2 focus:border-slate-200 focus:outline-none"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//             </div>

//             <div className="relative">
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     className="block w-full rounded-md border border-navy-100 px-10 py-2 focus:border-slate-200 focus:outline-none"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//             </div>
//             <div>
//                 {login ? (
//                     <>
//                         <button
//                             type="submit"
//                             className="rounded-lg bg-[#334155] text-white mt-10 px-16 py-2 text-center w-full"
//                         >
//                             LOGIN
//                         </button>
//                         <p className="my-8 text-center text-sm text-navy-200 md:text-base">
//                             Don't have an account?{" "}
//                             <Link
//                                 to={"/register"}
//                                 className="cursor-pointer font-semibold text-blue-700 hover:underline"
//                             >
//                                 Register here!
//                             </Link>
//                         </p>
//                     </>
//                 ) : (
//                     <>
//                         <button
//                             type="submit"
//                             className="rounded-lg bg-[#334155] text-white mt-10 px-16 py-2 text-center w-full"
//                         >
//                             REGISTER
//                         </button>
//                         <p className="my-8 text-center text-sm text-navy-200 md:text-base">
//                             Already have an account?{" "}
//                             <Link
//                                 to={"/login"}
//                                 className="cursor-pointer font-semibold text-blue-700 hover:underline"
//                             >
//                                 Login here!
//                             </Link>
//                         </p>
//                     </>
//                 )}
//             </div>
//         </form>
//     );
// };
