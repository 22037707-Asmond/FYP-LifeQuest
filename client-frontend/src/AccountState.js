// AccountState.js
import React, { createContext, useState } from 'react';

export const AccountState = createContext();

export const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState(null);

  return (
    <AccountState.Provider value={{ account, setAccount }}>
      {children}
    </AccountState.Provider>
  );
};
