import React from "react"
import { UserContext } from "../context/github/GithubContext"
import UserCard from "./UserCard"
import spinner from "../assets/loading.svg"
import { AlertContext } from "../context/alert/AlertContext"
import Alert from "./Alert"
import { searchUsers } from "../context/github/GithubActions"

export default function UserSearch() {
    const {users, loading, dispatch} = React.useContext(UserContext)
    const {alert, setAlert} = React.useContext(AlertContext)
    const [searched, setSearched] = React.useState<boolean>(false)

    async function handleAction(formData: FormData) {
        const text = formData.get("search")
        if(!text) {
            setAlert("SET_ALERT", "Enter search text")
        } else {
            const res = await searchUsers(String(text))
            dispatch({
                type: 'SET_USERS',
                users: res
            })
        }
    }

    return <div>
        <form action={handleAction} className="flex justify-center items-center p-4">
            <div className="join">
                <div>
                    <label className="input validator join-item w-72">
                    <input
                        type="text"
                        placeholder="search user"
                        name="search"
                    ></input>
                    </label>
                    <div className="validator-hint hidden">enter search text</div>
                </div>
                <button className="btn btn-neutral join-item">Search</button>
                {users.length > 0 && (
                    <button className="btn btn-ghost join-item" onClick={() => {
                        dispatch({type: 'CLEAR_USERS'})
                        setSearched(false)
                    }}>Clear</button>
                )}
            </div>
        </form>
        {
            alert ?
            <Alert>{alert}</Alert> : null
        }
        {
            loading ? 
                <div className="flex justify-center items-center">
                    <img src={spinner} alt="loading" width="40px" />
                </div>
            : searched && users.length === 0 ?
            <div className="flex justify-center items-center">
                <p>No users found</p>
            </div>
            :
            <div className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-4 p-6">
                {users.map(user => <UserCard user={user} key={user.login} />)}
            </div>
        }
    </div>
}