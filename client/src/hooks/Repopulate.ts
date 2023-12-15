import axios from "axios";
import { useDispatch } from "react-redux";
import jsonwebtoken from "jsonwebtoken";

export default async function Repopulate() {
    const dispatch = useDispatch();
    const jwt = jsonwebtoken;
    const sessionToken = localStorage.getItem("sessionToken");
    const token = sessionToken!.split(" ")[1];
    const userId = jwt.verify(token, "1234");
    const res = await axios.get(`http://localhost:8000/api/users/${userId}`);
    dispatch(res.data.user);
}
