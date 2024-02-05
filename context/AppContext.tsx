'use client'
import { createContext, useContext } from "react";
import { useAddress, useContract, useContractRead,  useConnect } from "@thirdweb-dev/react";


const AppContext = createContext({} as any);


export const AppContextProvider = ({children}: {children: React.ReactNode}) => {
    const { data: contract } = useContract("0xAD27748d2605F9C06CE9C2b3C738c1262acc565A");
    


    return(
        <AppContext.Provider
            value={{
                contract
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);