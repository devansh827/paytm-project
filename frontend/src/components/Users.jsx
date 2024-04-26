import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";



export const Users = ({ signedInUserId }) => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            .then(response => {
                setUsers(response.data.user)
            })
    }, [filter])
    console.log(signedInUserId)
    // Filter out the signed-in user from the list
    const filteredUsers = users.filter(user => user._id != signedInUserId);
      console.log(filteredUsers)
    // for(let i=0;i<filteredUsers.length;i++)
    // {
    //     console.log(filteredUsers[i]._id);
    //     console.log(filteredUsers[i].firstName);
    // }
    return (
        <>
            <div className="font-bold mt-6 text-lg">Users</div>
            <div className="my-2">
                <input
                    onChange={(e) => setFilter(e.target.value)}
                    type="text"
                    placeholder="Search users..."
                    className="w-full px-2 py-1 border rounded border-slate-200"
                />
            </div>
            <div>
                {filteredUsers.map(user => (
                    <User key={user._id} user={user} />
                ))}
            </div>
        </>
    );
}

function User({ user }) {
    const navigate = useNavigate();

    return (
        <div>
            <div className="flex justify-between">
                <div className="flex">
                    <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                        <div className="flex flex-col justify-center h-full text-xl">
                            {user.firstName[0]}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center h-ful">
                        <div>
                            {user.firstName} {user.lastName}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-center h-ful">
                    <Button
                        onClick={(e) => navigate(`/send?id=${user._id}&name=${user.firstName}`)}
                        label="Send Money"
                    />
                </div>
            </div>
        </div>
    );
}
