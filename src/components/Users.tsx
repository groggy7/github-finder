import spinner from "../assets/loading.svg"
import { UserContext } from "../context/UserContext"
import React from "react"
import UserCard from "./UserCard"

export default function Users() {
    const {users} = React.useContext(UserContext)
    return users ?
        <div className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-4 p-6">
            {
                users.map(user => <UserCard user={user} key={user.login} />)
            }
        </div>
    :
    <div className="flex justify-center items-center">
        <img src={spinner} alt="loading" width="40px" />
    </div>
}