import axios from "axios";

type User = {
    email: string;
    password: string;
};

export default async function loginUser(user: User) {
    console.log("login: ", user);
    return axios.post(`${import.meta.env.VITE_APP_API_HOST}/api/users/login`, {
        email: user.email,
        password: user.password,
    });
}
