export {};

declare global {
    type Milestone = {
        _id?: string;
        title: string;
        description?: string;
        deadline: string;
        status: string;
        owner?: string;
        tags: string[];
    };
}
