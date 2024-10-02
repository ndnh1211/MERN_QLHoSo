
import { createContext, useState } from "react";


export const Context = createContext()

const ContextProvider = (props) => {
    const [account, setAccount] = useState(undefined)

    const contextValue = {

        account,
        setAccount
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider