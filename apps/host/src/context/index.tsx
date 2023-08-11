import React, { createContext, useContext, useState } from "react";

const defaultUser = null;

const UserContext = createContext([defaultUser, (user: any) => user] as const);

export function UserProvider({ children }) {
  return (
    <UserContext.Provider value={useState(defaultUser)}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
