import React from "react"
import { UserContext } from "../context/github/GithubContext"
import UserCard from "./UserCard"
import spinner from "../assets/loading.svg"
import { AlertContext } from "../context/alert/AlertContext"
import Alert from "./Alert"

export default function UserSearch() {
    const {users, loading, dispatch} = React.useContext(UserContext)
    const {alert, setAlert} = React.useContext(AlertContext)
    const [searched, setSearched] = React.useState<boolean>(false)

    function searchUsers(search: string) {
        dispatch({type: 'SET_LOADING', users: []})
        setSearched(true)
        fetch("https://api.github.com/search/users?q=" + search, {
            headers: {
                'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}` ,
                'Accept': 'application/vnd.github+json',
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        .then(res => res.json())
        .then(data => dispatch({
            type: 'GET_USERS',
            users: data.items
        }))
        .catch(err => console.error(err))
    }

    function clearUsers() {
        dispatch({
            type: 'CLEAR_USERS',
            users: []
        })
        setSearched(false)
    }

    function handleAction(formData: FormData) {
        const text = formData.get("search")
        if(!text) {
            setAlert("SET_ALERT", "Enter search text")
        } else {
            searchUsers(text)
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
                    <button className="btn btn-ghost join-item" onClick={clearUsers }>Clear</button>
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