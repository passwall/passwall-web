import { createContext, useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
    const [formType, formTypeSet] = useState("pro")

    const changeFormType = (formType) => {
        formTypeSet(formType)
    }

    return (
        <AppContext.Provider value={{formType, changeFormType}}>
        {children}
        </AppContext.Provider>
    )
}

export default AppContext