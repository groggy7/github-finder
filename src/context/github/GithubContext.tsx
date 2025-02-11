import React from "react"
import GithubReducer from "./GithubReducer";
import { GithubUser, GithubUserDetails, GitHubRepo, UserState } from "./GithubReducer";
import axios from "axios";

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

const axiosInstance = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
    }
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
            axiosInstance.get(`/search/users?q=${search}`).then((res) => {
                dispatch({
                    type: 'SET_USERS',
                    users: res.data.items
                })
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
            axiosInstance.get(`/users/${username}`).then((res) => {
                dispatch({
                    type: 'SET_USER',
                    user: res.data
                })
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
            axiosInstance.get(`/users/${username}/repos`).then((res) => {
                dispatch({
                    type: 'SET_REPOS',
                    repos: res.data
                })
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