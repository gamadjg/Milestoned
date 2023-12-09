export const firstName_validation = {
    name: "firstName",
    label: "firstName",
    type: "text",
    id: "firstName",
    placeholder: "First Name",
    validation: {
        required: {
            value: true,
            message: "required",
        },
        maxLength: {
            value: 30,
            message: "30 characters max",
        },
    },
};

export const lastName_validation = {
    name: "lastName",
    label: "lastName",
    type: "text",
    id: "lastName",
    placeholder: "Last Name",
    validation: {
        required: {
            value: true,
            message: "required",
        },
        maxLength: {
            value: 30,
            message: "30 characters max",
        },
    },
};

export const password_validation = {
    name: "password",
    label: "password",
    type: "password",
    id: "password",
    placeholder: "Password",
    validation: {
        required: {
            value: true,
            message: "required",
        },
        minLength: {
            value: 4,
            message: "min 4 characters",
        },
    },
};

// export const desc_validation = {
//     name: "description",
//     label: "description",
//     multiline: true,
//     id: "description",
//     placeholder: "write description ...",
//     validation: {
//         required: {
//             value: true,
//             message: "required",
//         },
//         maxLength: {
//             value: 200,
//             message: "200 characters max",
//         },
//     },
// };

// export const num_validation = {
//     name: "num",
//     label: "number",
//     type: "number",
//     id: "num",
//     placeholder: "write a random number",
//     validation: {
//         required: {
//             value: true,
//             message: "required",
//         },
//     },
// };

export const email_validation = {
    name: "email",
    label: "email address",
    type: "email",
    id: "email",
    placeholder: "Email address",
    validation: {
        required: {
            value: true,
            message: "required",
        },
        pattern: {
            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "not valid",
        },
    },
};
