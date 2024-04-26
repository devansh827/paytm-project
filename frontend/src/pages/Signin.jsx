import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [incorrectPassword, setIncorrectPassword] = useState(false); // State to track incorrect password
    const navigate = useNavigate();

    const handleSignIn = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                username,
                password
            });
            localStorage.setItem("token", response.data.token);
            navigate("/Dashboard");
        } catch (error) {
            console.error("Error signing in:", error);
            setIncorrectPassword(true); // Set incorrect password state to true
        }
    };

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"} />
                    <SubHeading label={"Enter your credentials to access your account"} />
                    <InputBox
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="harkirat@gmail.com"
                        label={"Email"}
                    />
                    <InputBox
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="123456"
                        label={"Password"}
                        // Apply red border if incorrectPassword is true
                        className={incorrectPassword ? "border-red-500" : ""}
                    />
                    {incorrectPassword && ( // Conditionally render the div below password input box
                        <div className="text-red-500 text-sm mt-1">
                            Incorrect password. Please enter the correct password.
                        </div>
                    )}
                    <div className="pt-4">
                        <Button onClick={handleSignIn} label={"Sign in"} />
                    </div>
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
                </div>
            </div>
        </div>
    );
};
