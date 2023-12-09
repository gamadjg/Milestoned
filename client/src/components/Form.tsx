import { Input } from "./Input";
import { useForm, FormProvider } from "react-hook-form";
import {
    firstName_validation,
    password_validation,
    num_validation,
    desc_validation,
    email_validation,
} from "../lib/userValidations";

export const Form = () => {
    const methods = useForm();
    const onSubmit = methods.handleSubmit((data) => {
        console.log(data);
    });

    return (
        <div className="container mt-5 text-center">
            <FormProvider {...methods}>
                <form
                    onSubmit={(e) => e.preventDefault()}
                    noValidate
                    autoComplete="off"
                    className="container"
                >
                    <div className="grid gap-5">
                        <Input {...firstName_validation} />
                        <Input {...password_validation} />
                        <Input {...num_validation} />
                        <Input {...email_validation} />
                        <Input {...desc_validation} />
                    </div>
                    <div className="mt-5">
                        <button
                            onClick={onSubmit}
                            className="flex items-center gap-1 p-5 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-800"
                        >
                            {/* <GrMail /> */}
                            Submit Form
                        </button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

// import { Input } from "./Input";
// import { useForm, FormProvider } from "react-hook-form";
// import {
//     name_validation,
//     password_validation,
//     num_validation,
//     desc_validation,
//     email_validation,
// } from "../lib/validations";

// export const Form = () => {
//     const methods = useForm();
//     const onSubmit = methods.handleSubmit((data) => {
//         console.log(data);
//     });

//     return (
//         <div className="container mt-5 text-center">
//             <FormProvider {...methods}>
//                 <form
//                     onSubmit={(e) => e.preventDefault()}
//                     noValidate
//                     autoComplete="off"
//                     className="container"
//                 >
//                     <div className="grid gap-5 md:grid-cols-2">
//                         <Input {...name_validation} />
//                         <Input {...password_validation} />
//                         <Input {...num_validation} />
//                         <Input {...email_validation} />
//                         <Input {...desc_validation} />
//                     </div>
//                     <div className="mt-5">
//                         <button
//                             onClick={onSubmit}
//                             className="flex items-center gap-1 p-5 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-800"
//                         >
//                             {/* <GrMail /> */}
//                             Submit Form
//                         </button>
//                     </div>
//                 </form>
//             </FormProvider>
//         </div>
//     );
// };
