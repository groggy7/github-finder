import React from "react"
import GithubReducer from "./GithubReducer";
import { GithubUser, GithubUserDetails, GitHubRepo, UserState, UserAction } from "./GithubReducer";

type UserContextType = {
    users: GithubUser[]
    user?: GithubUserDetails
    repos: GitHubRepo[]
    loading: boolean
    dispatch: React.ActionDispatch<[action: UserAction]>
}

type UserProviderProps = {
    children: React.ReactNode
}

export const UserContext = React.createContext<UserContextType>({
    users: [], user: undefined, repos: [], loading: false, dispatch: () => {}
})

export default function UserProvider({ children }: UserProviderProps) {
    const initialState: UserState = {
        users: [],
        user: undefined,
        repos: [],
        loading: false
    }

    const [state, dispatch] = React.useReducer(GithubReducer, initialState)

    return <UserContext.Provider value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        dispatch: dispatch
    }}>
    {children}
  </UserContext.Provider>
}