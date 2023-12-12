import { RegisterOptions, useFormContext } from "react-hook-form";
import { useState } from "react";
import { motion } from "framer-motion";
import { findInputError } from "../lib/findInputError";
import { isFormInvalid } from "../lib/isFormInvalid";
import { MdError } from "react-icons/md";
import { AnimatePresence } from "framer-motion";
type messageProps = {
    message: string;
};

type Error = {
    error: {
        message: string;
    };
};

type InputProps = {
    label?: string;
    name: string;
    type?: string;
    id: string;
    placeholder: string;
    validation?: RegisterOptions;
    multiline?: boolean;
    status?: boolean;
    date?: boolean;
    options?: string[];
    initialValue?: string;
    // descriptionHandler?: (descLength: number) => void;
};

const framer_error = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.2 },
};

const InputError = ({ message }: messageProps) => {
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

// const descriptionLength = useMemo(() => {});

// const descriptionHandler = (e: any) => {
//     console.log("description update: ", e.currentTarget.value);
//     // descriptionLength
//     // if (
//     //     e.currentTarget.value.length < descriptionLength ||
//     //     descriptionLength < maxDescriptionLength
//     // ) {
//     //     setDescription(e.currentTarget.value);
//     // } else {
//     //     console.log("max description size reached.");
//     // }
// };

export const Input = ({
    // label,
    name,
    type,
    id,
    placeholder,
    validation,
    multiline,
    status,
    date,
    options,
    initialValue,
}: // descriptionHandler,
InputProps) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    const inputError = findInputError(errors, name) as Error;
    const isInvalid = isFormInvalid(inputError);
    const maxDescriptionLength = 500;
    const [description, setDescription] = useState(
        multiline ? initialValue! : ""
    );
    const [descriptionLength, setDescriptionLength] = useState(
        multiline ? initialValue!.length : 0
    );

    const descriptionHandler = (desc: string) => {
        if (
            desc.length < descriptionLength ||
            descriptionLength < maxDescriptionLength
        ) {
            setDescriptionLength(desc.length);
            setDescription(desc);
        } else {
            console.log("max description size reached.");
        }
    };

    return (
        <div className="flex flex-col w-full">
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
                <>
                    <textarea
                        id={id}
                        typeof={type}
                        // className="p-5 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60 min-h-[10rem] max-h-[20rem] resize-y"
                        className="w-full h-40 border border-[#94A3B8] rounded-md px-2 py-2 mt-1 resize-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder={placeholder}
                        value={description}
                        onChangeCapture={(e) => {
                            descriptionHandler!(e.currentTarget.value);
                        }}
                        {...register(`${name}`, validation)}
                    ></textarea>
                    <div className="flex justify-end mr-2">
                        <div className="text-xs leading-4 font-normal text-gray-400">
                            {descriptionLength}/{maxDescriptionLength}
                        </div>
                    </div>
                </>
            ) : status ? (
                <select
                    id={id}
                    defaultValue={initialValue}
                    className="w-full border border-[#94A3B8] rounded-md px-2 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    {...register(name, validation)}
                >
                    {options!.map((value) => {
                        return (
                            <option key={value} value={value}>
                                {value}
                            </option>
                        );
                    })}
                </select>
            ) : date ? (
                <input
                    id={id}
                    type={type}
                    defaultValue={initialValue}
                    // className="p-5 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60"
                    className="w-full border border-[#94A3B8] rounded-md px-2 py-2 focus:border-slate-200 focus:outline-none"
                    placeholder={placeholder}
                    {...register(name, validation)}
                />
            ) : (
                <input
                    id={id}
                    type={type}
                    // className="p-5 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60"
                    className="w-full border border-[#94A3B8] rounded-md px-2 py-2 focus:border-slate-200 focus:outline-none"
                    placeholder={placeholder}
                    defaultValue={initialValue}
                    {...register(name, validation)}
                />
            )}
        </div>
    );
};
