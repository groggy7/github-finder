type AlertState = {
    message: string
}

export type AlertAction = {
    type: 'SET_ALERT' | 'REMOVE_ALERT'
    message: string
}

export default function AlertReducer(state: AlertState, action: AlertAction) {
    switch(action.type) {
        case 'SET_ALERT': {
            return { message: action.message }
        }
        case 'REMOVE_ALERT': {
            return { message: "" }
        }
        default: {
            return state
        }
    }
}