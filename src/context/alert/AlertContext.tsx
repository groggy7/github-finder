import React from "react";
import AlertReducer from "./AlertReducer";

type AlertContextType = {
    alert: string
    setAlert: (type: 'SET_ALERT' | 'REMOVE_ALERT', msg: string) => void
}

export const AlertContext = React.createContext<AlertContextType>({alert: "", setAlert: () => {}})

interface AlertProviderProps {
    children: React.ReactNode
}

export default function AlertProvider({ children }: AlertProviderProps) {
    const initialState = {
        message: ""
    }

    const [state, dispatch] = React.useReducer(AlertReducer, initialState)

    function setAlert(type: 'SET_ALERT' | 'REMOVE_ALERT', msg: string) {
        dispatch({
            type: type,
            message: msg
        })

        setTimeout(() => dispatch({
            type: 'REMOVE_ALERT', message: '',
        }), 3000)
    }

    return <AlertContext.Provider value={{
        alert: state.message, 
        setAlert: setAlert
    }}>
        {children}
    </AlertContext.Provider>
}