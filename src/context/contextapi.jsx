import { createContext } from "react";
const Context=createContext({
    userID:null,
    LoggedIn:false,
    LoggingIn:true
}
);
export default Context;