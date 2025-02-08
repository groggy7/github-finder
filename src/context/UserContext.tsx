import React from "react"

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

type UserState = {
    users: GithubUser[]
    loading: boolean
}

type UserContextType = {
    users: GithubUser[]
    loading: boolean
    dispatch: React.Dispatch<{ type: string; users?: any }>
}

export const UserContext = React.createContext<UserContextType>({users: [], loading: false, dispatch: () => {} })

function reducer(state: UserState, action: { type: string; users?: any }) {
    switch (action.type) {
        case 'GET_USERS': {
            return {
                ...state,
                users: action.users,
                loading: false
            }
        }
        case 'CLEAR_USERS': {
            return {
                ...state,
                users: []
            }
        }
        case 'SET_LOADING': {
            return {
                ...state,
                loading: true
            }
        }
        default:
            return state
    }
}

export default function UserProvider({ children }: { children: React.ReactNode }) {
    const initialState = {
        users: [],
        loading: false
    }

    const [state, dispatch] = React.useReducer(reducer, initialState)

    return <UserContext.Provider value={{
        users: state?.users,
        loading: state?.loading,
        dispatch: dispatch
    }}>
    {children}
  </UserContext.Provider>
}