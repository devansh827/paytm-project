import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useState, useEffect } from "react"
import axios from "axios"

export const Dashboard = () => {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Authentication token not found.");
            return;
        }

        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: `Bearer ${token}`,
                // Optional: Content-Length header if required by the server
                "Content-Length": 0
            }
        })
        .then(response => {
            console.log(response);
            setBalance(response.data.balance);
        })
        .catch(error => {
            console.error("Error fetching balance:", error);
        });
    }, []);

    return (
        <div>
            <Appbar />
            <div className="m-8">
                <Balance value={balance} />
                <Users />
            </div>
        </div>
    );
};