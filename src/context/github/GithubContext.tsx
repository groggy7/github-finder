import React from "react"
import GithubReducer from "./GithubReducer";
import { GithubUser, GithubUserDetails, GitHubRepo, UserState } from "./GithubReducer";

type UserContextType = {
    users: GithubUser[]
    user?: GithubUserDetails
    repos: GitHubRepo[]
    loading: boolean
    searchUsers: (search: string) => void
    getUser: (username: string) => void
    getUserRepos: (username: string) => void
    clearUsers: () => void
}

type UserProviderProps = {
    children: React.ReactNode
}

export const UserContext = React.createContext<UserContextType>({
    users: [], user: undefined, repos: [], loading: false, 
    searchUsers: () => {},
    getUser: () => {},
    getUserRepos: () => {},
    clearUsers: () => {}, 
})

export default function UserProvider({ children }: UserProviderProps) {
    const initialState: UserState = {
        users: [],
        user: undefined,
        repos: [],
        loading: false
    }

    const [state, dispatch] = React.useReducer(GithubReducer, initialState)

    function clearUsers() {
        dispatch({
            type: 'CLEAR_USERS'
        })
    }

    async function searchUsers(search: string) {
        dispatch({
            type: 'SET_LOADING'
        })
        
        try {
            const response = await fetch("https://api.github.com/search/users?q=" + search, {
                headers: {
                    'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`,
                    'Accept': 'application/vnd.github+json',
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })
            const data = await response.json()
            dispatch({
                type: 'SET_USERS',
                users: data.items
            })
        } catch (err) {
            console.error(err)
            dispatch({
                type: 'SET_USERS',
                users: []
            })
        }
    }

    async function getUser(username: string) {
        dispatch({
            type: 'SET_LOADING'
        })

        try {
            const response = await fetch("https://api.github.com/users/" + username, {
                headers: {
                    'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`,
                    'Accept': 'application/vnd.github+json',
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })
            const data = await response.json()
            dispatch({
                type: 'SET_USER',
                user: data
            })
        } catch (err) {
            console.error(err)
        }
    }

    async function getUserRepos(username: string) {
        dispatch({
            type: 'SET_LOADING'
        })

        try {
            const response = await fetch(`https://api.github.com/users/${username}/repos`, {
                headers: {
                    'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`,
                    'Accept': 'application/vnd.github+json',
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })
            const data = await response.json()
            dispatch({
                type: 'SET_REPOS',
                repos: data
            })
        } catch (err) {
            console.error(err)
        }
    }

    return <UserContext.Provider value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers: searchUsers,
        getUser: getUser,
        getUserRepos: getUserRepos,
        clearUsers: clearUsers,
    }}>
    {children}
  </UserContext.Provider>
}