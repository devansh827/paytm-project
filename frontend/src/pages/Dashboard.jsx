import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useState, useEffect } from "react"
import axios from "axios"

export const Dashboard = () => {
    const [balance, setBalance] = useState(0);
    const [userId, setUserId] = useState(null);

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
            }
        })
        .then(response => {
            console.log(response);
            setBalance(response.data.balance);
            setUserId(response.data.userId); // Assuming the user ID is returned from the backend
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
                {/* Pass userId as a prop to the Users component */}
                {<Users signedInUserId={userId} />}
            </div>
        </div>
    );
};
