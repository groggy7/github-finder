import React from "react"
import GithubReducer, { UserAction } from "./GithubReducer";

export interface GithubUser {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    user_view_type: string;
}

type UserContextType = {
    users: GithubUser[]
    loading: boolean
    dispatch: React.Dispatch<UserAction>
}

type UserProviderProps = {
    children: React.ReactNode
}

export const UserContext = React.createContext<UserContextType>({users: [], loading: false, dispatch: () => {} })

export default function UserProvider({ children }: UserProviderProps) {
    const initialState = {
        users: [],
        loading: false
    }

    const [state, dispatch] = React.useReducer(GithubReducer, initialState)

    return <UserContext.Provider value={{
        users: state?.users,
        loading: state?.loading,
        dispatch: dispatch
    }}>
    {children}
  </UserContext.Provider>
}