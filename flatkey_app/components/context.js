import React, {useState, createContext}  from 'react';

export const AuthContext = createContext();

const AuthProvider = props => {
    const signIn = {"user": "usuario"};

    return (
        <AuthContext.Provider value={signIn}>
            {props.children}
        </AuthContext.Provider>
    );
}
