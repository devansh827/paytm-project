import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const SuccessPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            // Navigate to dashboard after 10 seconds
            navigate("/dashboard");
        }, 5000); 

        return () => clearTimeout(timeoutId);
    }, [navigate]);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-green-500 mb-4">Transfer Successful!</h2>
                <p className="text-lg">Your money has been successfully transferred.</p>
            </div>
        </div>
    );
};