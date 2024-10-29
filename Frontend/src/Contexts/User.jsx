import { createContext, useContext, useState } from "react"


export const userContext = createContext(null);

export function useUserInfo (){
    const userInfo = useContext(userContext);
    return userInfo
}

export default function UserProvider(props){
     const [loggedIn , setLoggedIn] = useState(false);
     const [contextUser , setContextUser] = useState(null);

     return (
        <userContext.Provider value={{loggedIn , setContextUser , setLoggedIn , contextUser}}>
            {
                props.children
            }
        </userContext.Provider>
     )
}