// import React, { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [isSignedIn, setIsSignedIn] = useState(false);

//   const onAccess = () => {
//     setIsSignedIn((prevState) => !prevState);
//   };

//   return <AuthContext.Provider value={{ isSignedIn, onAccess }}>{children}</AuthContext.Provider>;
// };

// const useAuth = () => useContext(AuthContext);

// export { AuthProvider, useAuth };
