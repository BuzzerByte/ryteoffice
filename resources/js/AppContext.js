import React, { createContext } from 'react';

export const AppContext = createContext();

// export const AppProvider = props => (
//     <AppContext.Provider value={props}>{props.children}</AppContext.Provider>
// );

export const AppProvider = React.forwardRef((props, ref) => (
    <AppContext.Provider value={props} ref = {ref}>{props.children}</AppContext.Provider>
));
