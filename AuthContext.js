import * as React from "react";

export const AuthContext = React.createContext({
    username: '',
    setUsername: (value) => {},
});