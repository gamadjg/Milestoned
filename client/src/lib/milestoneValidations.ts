export const title_validation = {
    name: "title",
    label: "title",
    type: "text",
    id: "title",
    placeholder: "Title",
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

export const description_validation = {
    name: "description",
    label: "description",
    multiline: true,
    id: "description",
    placeholder: "Description",
    validation: {
        required: {
            value: false,
            message: "required",
        },
        maxLength: {
            value: 500,
            message: "500 characters max",
        },
    },
};

export const status_validation = {
    name: "status",
    label: "status",
    id: "status",
    status: true,
    placeholder: "Status",
    options: ["In Progress", "Completed", "Not Started"],
    validation: {
        required: {
            value: true,
            message: "required",
        },
    },
};

export const date_validation = {
    name: "date",
    label: "date",
    type: "date",
    id: "date",
    date: true,
    placeholder: "Date",
    validation: {
        required: {
            value: true,
            message: "required",
        },
    },
};

export const tags_validation = {
    name: "tags",
    label: "tags",
    id: "tags",
    placeholder: "Tags",
    validation: {
        required: {
            value: false,
            message: "required",
        },
    },
};
