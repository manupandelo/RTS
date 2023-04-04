import React, { useContext } from "react";

export const initialState = {
    user: []
};

export const ActionTypes = {                         //SETS
    SetUser: 'SET_USER',
    SetEliminarUser: 'SET_ELIMINAR_USER'
};

export const reducer = (state = {}, action) => {
    switch (action.type) {
    case ActionTypes.SetUser:
        return ({
            ...state,
            user: [...state.user, action.value],
        });
    case ActionTypes.SetEliminarUser:
        return ({
            ...state,
            user: state.user.filter((item) => item.id !== action.value),  
        });
default:
    return state;
    
}
};

export const initialContext = {
    contextState: initialState,
    setContextState: () => {},
};

const Cont = React.createContext(initialContext);


export function ContextProvider({children, initial = initialState}) {
    const [state, dispatch] = React.useReducer(reducer, initial);


    const contextState = state;
    const setContextState = dispatch;

    return <Cont.Provider value={{contextState, setContextState }}>{children}</Cont.Provider>   // devuelve el provider para que se pueda usar en el resto de la app
}

export const useContextState = () => useContext(Cont);