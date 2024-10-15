import { createContext, useState } from "react"


export const userContext = createContext(null);

export function useUserInfo (){
    const userInfo = userContext(userContext);
    return userInfo
}

export default UserProvider = (props)=>{
     const [loggedIn , setLoggedIn] = useState(false);
     const [contextUser , setContextUser] = useState({});

     return (
        <userContext.Provider>
            {
                props.children
            }
        </userContext.Provider>
     )
}