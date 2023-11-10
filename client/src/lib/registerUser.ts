type user = {
    email: string;
    password: string;
};

export default function registerUser(user: user) {
    console.log("register: ", user);
}
