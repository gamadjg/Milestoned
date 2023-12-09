import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import { findInputError } from "../lib/findInputError";
import { isFormInvalid } from "../lib/isFormInvalid";
import { MdError } from "react-icons/md";
import { AnimatePresence } from "framer-motion";

type InputProps = {
    label: string;
    name: string;
    type?: string;
    id: string;
    placeholder: string;
    validation?: any;
    multiline?: boolean;
};

const framer_error = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.2 },
};

const InputError = ({ message }) => {
    return (
        <motion.p
            className="flex items-center gap-1 px-2 font-semibold text-red-500 bg-red-100 rounded-md"
            {...framer_error}
        >
            <MdError />
            {message}
        </motion.p>
    );
};

export const Input = ({
    label,
    name,
    type,
    id,
    placeholder,
    validation,
    multiline,
}: InputProps) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    const inputError = findInputError(errors, name);
    const isInvalid = isFormInvalid(inputError);

    //classname for textArea ->  md:col-span-2

    return (
        <div className="flex flex-col w-full">
            {/* <div className="flex justify-between md:col-span-2"> */}
            <div className="flex justify-between min-h-[25px]">
                {/* <label htmlFor={id} className="font-semibold capitalize">
                    {label}
                </label> */}
                <AnimatePresence mode="wait" initial={false}>
                    {isInvalid && (
                        <InputError
                            message={inputError.error.message}
                            key={inputError.error.message}
                        />
                    )}
                </AnimatePresence>
            </div>
            {multiline ? (
                <textarea
                    id={id}
                    type={type}
                    className="p-5 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60 min-h-[10rem] max-h-[20rem] resize-y"
                    placeholder={placeholder}
                    {...register(`${name}`, validation)}
                ></textarea>
            ) : (
                <input
                    id={id}
                    type={type}
                    // className="p-5 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60"
                    className="mb-5 block w-full rounded-md border border-navy-100 px-10 py-2 focus:border-slate-200 focus:outline-none"
                    placeholder={placeholder}
                    {...register(name, validation)}
                />
            )}
        </div>
    );
};
