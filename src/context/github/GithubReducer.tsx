import { GithubUser } from "./GithubContext";

type UserState = {
    users: GithubUser[]
    loading: boolean
}

export type UserAction = {
    type: string
    users: GithubUser[]
}

export default function GithubReducer(state: UserState, action: UserAction) {
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

